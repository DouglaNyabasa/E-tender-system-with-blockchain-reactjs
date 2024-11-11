require("dotenv").config();
const mysql = require("mysql")

const connection = mysql.createConnection({
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASS,
    database:process.env.DBNAME
});

const createTablesQueries = [
    // Users Table
    `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        names VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    
    // Officers Table
    `CREATE TABLE IF NOT EXISTS officers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        dob DATE NOT NULL,
        gender VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,

    // Suppliers Table
    `CREATE TABLE IF NOT EXISTS suppliers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,

    // Admins Table
    `CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,

    // Transactions Table
    `CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        supplier_name VARCHAR(255) NOT NULL,
        tender_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        bid_price DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,

    // Tenders Table
    `CREATE TABLE IF NOT EXISTS tenders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        bid_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expiry_date DATE NOT NULL,
        status VARCHAR(50) NOT NULL
    );`
];

const insertDummyDataQueries = [
    // Insert Users
    `INSERT INTO users (email, password, names, role) VALUES
    ('john.doe@example.com', 'password123', 'John Doe', 'Admin'),
    ('jane.smith@example.com', 'password456', 'Jane Smith', 'Procurement Officer'),
    ('alice.johnson@example.com', 'password789', 'Alice Johnson', 'Supplier');`,

    // Insert Officers
    `INSERT INTO officers (full_name, email, password, dob, gender) VALUES
    ('Michael Brown', 'michael.brown@company.com', 'password123', '1985-04-10', 'Male'),
    ('Emily Clark', 'emily.clark@company.com', 'password456', '1990-07-23', 'Female'),
    ('David Wilson', 'david.wilson@company.com', 'password789', '1987-11-05', 'Male');`,

    // Insert Suppliers
    `INSERT INTO suppliers (name, address, email, password, phone) VALUES
    ('ABC Suppliers', '123 Main Street, City, Country', 'abc.supplier@example.com', 'supplier123', '555-1234'),
    ('XYZ Enterprises', '456 Oak Avenue, City, Country', 'xyz.enterprises@example.com', 'enterprises456', '555-5678'),
    ('Global Traders', '789 Pine Road, City, Country', 'global.traders@example.com', 'global789', '555-9101');`,

    // Insert Admins
    `INSERT INTO admins (email, password) VALUES
    ('admin@example.com', 'adminpass123'),
    ('superadmin@example.com', 'superadminpass456');`,

    // Insert Transactions
    `INSERT INTO transactions (supplier_name, tender_id, title, bid_price, status) VALUES
    ('ABC Suppliers', 1, 'Office Supplies Tender', 1500.00, 'Pending'),
    ('XYZ Enterprises', 2, 'Construction Materials Tender', 35000.00, 'Approved'),
    ('Global Traders', 3, 'Electronics Tender', 12000.00, 'Rejected');`,

    // Insert Tenders
    `INSERT INTO tenders (title, description, supplier_name, supplier_id, bid_price, created_at, expiry_date, status) VALUES
    ('Office Supplies Tender', 'Tender for office supplies including chairs, desks, and computers.', 'ABC Suppliers', 1, 1500.00, NOW(), '2024-12-31', 'Open'),
    ('Construction Materials Tender', 'Tender for construction materials for building projects.', 'XYZ Enterprises', 2, 35000.00, NOW(), '2024-12-15', 'Closed'),
    ('Electronics Tender', 'Tender for purchasing electronics for the government office.', 'Global Traders', 3, 12000.00, NOW(), '2024-11-30', 'Open');`
];

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the MySQL server.');
})

// Function to create the tables
function createTables() {
    

        // Execute all CREATE TABLE SQL statements
        createTablesQueries.forEach((sql, index) => {
            connection.query(sql, (error, results) => {
                if (error) {
                    console.error(`Error creating table at index ${index}:`, error.message);
                    return;
                }
                console.log(`Table created successfully for query ${index + 1}`);
            });
        });
}
function insertDummyData() {
    insertDummyDataQueries.forEach(query => {
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
            } else {
                console.log('Data inserted successfully:', results);
            }
        });
    });
}

// Call the function to create tables
createTables();