require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const format = require("date-fns");
const { encryptData, decryptData, generateToken, verifyToken, generateBase32Secret } = require("./extras.js");
const multer = require("multer");
const BodyParser = require("body-parser");
const OTPAuth = require("otpauth");
const encode = require("hi-base32");
const QRCode = require('qrcode');
var fs = require('fs');
const rfs = require("rotating-file-stream")
const PORT = 8080;

const app = express();
const mySQL_connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

mySQL_connection.connect((err) => {
    if (err) {
        console.error('MYSQL=> error connecting: ' + err.stack);
        return;
    }

    console.log('MYSQL=> connected as id ' + mySQL_connection.threadId);
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());

function logFileName(time) {
    if (!time) return 'access.log';
    return `${format.format(time, "dd-MM-yyyy")}-access.log`;
}



const rfsStream = rfs.createStream(logFileName(new Date()), {
    interval: "1d",
    path: "./logs/"
})

app.use(morgan("combined", {
    stream: rfsStream
}));

app.use((req, res, next) => {
    const urlPath = req.path;

    // Check if the URL is not '/login' and does not include '/register'
    if (urlPath !== '/login' && !urlPath.includes('/register')) {
        console.log(JSON.stringify(req.headers))
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) return res.status(403).json({ error: "Missing token" });
    }
    next()
});
app.get("/api/otp/generate", (req, res) => {
    const base32_secret = generateBase32Secret();


    // Generate a QR code URL for the user to scan
    let totp = new OTPAuth.TOTP({
        issuer: req.hostname,
        label: "E-Tender",
        algorithm: "SHA1",
        digits: 6,
        secret: base32_secret,
    });

    let otpauth_url = totp.toString();

    QRCode.toDataURL(otpauth_url, (err, qrCodeUrl) => {
        if (err) {
            return res.status(500).json({ error: "Error generating QR code" });
        }

        // Send the response with the QR code URL and the OTP secret (for the user to configure in their app)
        res.json({
            msg: "success.",
            qrCodeUrl: qrCodeUrl,  // The data URL for the QR code image
            otpauthUrl: otpauth_url, // The OTP auth URL (for debugging or display purposes)
            secret: base32_secret   // The generated base32 secret (store it securely)
        });
    });
});
app.get("/api/otp/verify", (req, res) => {
    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const { otp } = req.body;


    const base32_secret = generateBase32Secret();


    // Generate a QR code URL for the user to scan
    let totp = new OTPAuth.TOTP({
        issuer: req.hostname,
        label: "E-Tender",
        algorithm: "SHA1",
        digits: 6,
        secret: base32_secret,
    });

    let validate = totp.validate({ otp });

    if (validate) {
        res.json({ data: "ok" });
    } else {
        res.status(400).json({ error: "Invalid code" });
    }

});
app.post("/login", (req, res) => {
    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const { email, password } = req.body;

    mySQL_connection.query(`SELECT * FROM users WHERE email='${email}'`, (err, results) => {
        if (err) res.status(500).json({ err: "Data quering error" });
        console.log(results)
        if (results?.length > 0) {
            const user_pass = results[0].password;
            console.log("Userpass" + decryptData(user_pass) + "  " + password)
            if (decryptData(user_pass) === password) {
                var token = generateToken(email, results[0].role);
                res.json({ u_token: token, names: results[0].names });
            } else {
                res.json({ msg: "Wrong Password" });
            }
        } else {
            res.json({ msg: "User does not exist" });
        }
    });

});
app.post("/officer/adduser", (req, res) => {
    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const { firstName, lastName, email, password, dob, gender } = req.body;

    mySQL_connection.query(`INSERT INTO officers VALUES(NULL,'${firstName + " " + lastName}','${email}','${password}','${dob}','${gender},NOW()')`, (err, results) => {
        if (err) res.status(500).json({ err: "Data quering error" });
        var token = generateToken(email, "Procurement Officer");
        res.json({
            data: "ok",
            u_token: token
        })
    });
})
app.post("/supplier/register", (req, res) => {
    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const { name, email, password, phone, address } = req.body;

    mySQL_connection.query(`INSERT INTO suppliers VALUES(NULL,'${name}',${address},'${email}','${password}','${phone}',NOW())`, (err, results) => {
        if (err) res.status(500).json({ err: "Data quering error" });

        res.status(200).json({ data: "ok" });
    })
});
app.get("/suppliers", (req, res) => {

    mySQL_connection.query(`SELECT * FROM suppliers`, (err, results) => {
        if (err) res.status(500).json({ err: "Data quering error" });
        res.json({ data: results });
    });
})
app.post("/admin/register", upload.single('file'), (req, res) => {
    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const { email, password } = req.body;

    mySQL_connection.query(`INSERT INTO admins VALUES(NULL,'${email}','${password}',NOW())`, (err, results) => {
        if (err) res.status(500).json({ err: "Data quering error" });

        var token = generateToken(email, "Admin");
        res.json({
            data: "ok",
            u_token: token
        })
    })
});

app.get("/transactions/:id", (req, res) => {

    try {
        var tokenVerify = verifyToken(token);
        var userInfo = tokenVerify.tokeninfo;

        if (req.params.id) {
            mySQL_connection.query(`SELECT * FROM transactions WHERE tenderId=${req.params?.id}`, (err, results) => {
                if (err) res.status(500).json({ err: "Data quering error" });
                res.json({ data: results });
            })
        } else {
            mySQL_connection.query("SELECT * FROM transactions ORDER BY date DESC", (err, results) => {
                if (err) res.status(500).json({ err: "Data quering error" });
                res.json({ data: results });
            })
        }


    } catch (err) {
        res.status(403).json({ msg: "Token invalid" })
    }

});

app.post("/transactions", (req, res) => {

    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const { supplierName, tenderId, title, price, status } = req.body;

    try {

        mySQL_connection.query(`INSERT INTO transactions VALUES(NULL,'${supplierName}',${tenderId},'${title}',${price},)`, (err, results) => {
            if (err) res.status(500).json({ err: "Data quering error" });
            res.json({ data: "ok" });
        })
    } catch (err) {
        res.status(400).json({ error: "Something went wrong." });
    }
});
app.get("/transactions/:tenderId", (req, res) => {
    mySQL_connection.query(`SELECT * FROM transactions WHERE tenderId=${req.params.tenderId}`, (err, results) => {
        if (err) res.status(500).json({ err: "Data quering error" });
        res.json({ data: results[0] });
    });
})
app.post("/transactions/edit", (req, res) => {

    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const { transactionId, amount, status } = req.body;

    try {

        mySQL_connection.query(`UPDATE transactions SET bid_price=${amount}`, (err, results) => {
            if (err) res.status(500).json({ err: "Data quering error" });
            res.json({ data: "ok" });
        })
    } catch (err) {
        res.status(400).json({ error: "Something went wrong." });
    }

});
app.get("/tenders", (req, res) => {

    try {
        mySQL_connection.query(`SELECT * FROM tenders`, (err, results) => {
            if (err) res.status(500).json({ err: "Data quering error" });
            res.json({ data: results });
        });
    } catch (err) {
        res.status(400).json({ error: "Something went wrong." });
    }
});
app.get("/tenders/:id", (req, res) => {

    try {

        if (req.params.id) {
            mySQL_connection.query(`SELECT * FROM tenders WHERE id=${req.params.id}`, (err, results) => {
                if (err) res.status(500).json({ err: "Data quering error" });
                res.json({ data: results[0] });
            });
        }
    } catch (err) {
        res.status(400).json({ error: "Something went wrong." });
    }
});
app.get("/tenders/status/:status", (req, res) => {

    try {

        if (req.params.status) {
            mySQL_connection.query(`SELECT * FROM tenders WHERE status=${req.params.status}`, (err, results) => {
                if (err) res.status(500).json({ err: "Data quering error" });
                res.json({ data: results });
            });
        } else {
            mySQL_connection.query(`SELECT * FROM tenders`, (err, results) => {
                if (err) res.status(500).json({ err: "Data quering error" });
                res.json({ data: results });
            });
        }
    } catch (err) {
        res.status(400).json({ error: "Something went wrong." });
    }
});
app.put("/tenders", (req, res) => {
    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const { title, description, bidPrice, expiryDate } = req.body;


    mySQL_connection.query(`INSERT INTO tenders VALUES(NULL,'${title}','${description}',${bidPrice},NOW(),${expiryDate},1)`, (err, results) => {
        if (err) res.status(500).json({ err: "Data quering error" });
        res.json({ data: "ok" });
    });
});
app.post("/tenders/:id", (req, res) => {
    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const { status, reqCode } = req.body;

    //Delete the tender
    if (reqCode === 1) {
        mySQL_connection.query(`DELETE FROM tenders WHERE id=${req.params.id}`, (err, results) => {
            if (err) res.status(500).json({ err: "Data quering error" });
            res.json({ data: "ok" });
        });
    } else if (reqCode === 2) {
        // Modify status of tender
        mySQL_connection.query(`UPDATE tenders SET status=${status} WHERE id=${req.params.id}`, (err, results) => {
            if (err) res.status(500).json({ err: "Data quering error" });
            res.json({ data: "ok" });
        });
    }
});
app.post("/tender/bid/add", (req, res) => {
    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const { tenantId, title, amount } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];

    const userInfor = verifyToken(token);
    mySQL_connection.query(`SELECT * FROM  suppliers WHERE id=${userInfor.tokeninfo.user}`, (err, results) => {
        if (err) res.status(500).json({ err: "Data entry error" });
        const supplierInfor = results[0];
        mySQL_connection.query(`INSERT INTO transactions (supplier_name, tender_id, title, bid_price, status) VALUES
    ('${supplierInfor.supplierName}', ${tenantId}, '${title}', ${amount}, 'Pending')`, (err1, results1) => {
            if (err1) res.status(500).json({ err: "Data entry error" });
            res.json({ data: "ok" });
        })
    })
});
app.get("/my_tender", (req, res) => {
    if (!req.body) return res.status(401).json({ error: "Missing Params" });
    const token = req.headers["authorization"]?.split(" ")[1];

    const userInfor = verifyToken(token);
    mySQL_connection.query(`SELECT * FROM  suppliers WHERE id=${userInfor.tokeninfo.user}`, (err, results) => {
        if (err) res.status(500).json({ err: "Data entry error" });
        const supplierInfor = results[0];
        mySQL_connection.query(`SELECT * FROM  transactions WHERE name=${supplierInfor.supplierName}`, (err, results1) => {
            if (err) res.status(500).json({ err: "Data entry error" });
            res.json({data:results[1]});
        });
    });
});
app.get("/tenders/:id", (req, res) => {

    mySQL_connection.query(`SELECT * FROM tenders WHERE id=${req.params.id}`, (err, results) => {
        if (err) res.status(500).json({ err: "Data quering error" });
        res.json({ data: results[0] });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});