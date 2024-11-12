const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const encode = require("hi-base32");


const key = "d0_not_t0u6h";
const privateKey = "pa55w0rd_key";

function encryptData(str){
	var encrypted =  CryptoJS.AES.encrypt(str,key);
	return encrypted.toString();
}
function decryptData(str){
	var decrypted = CryptoJS.AES.decrypt(str, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
function generateToken(username,role){
	var token = jwt.sign({user: username,u_role: role},privateKey,{expiresIn: "24h"});
	return token;
}
function verifyToken(token){
	try{
		var decode = jwt.verify(token,privateKey);
		return {code:200,msg:"token valid",tokeninfo:decode};
	}catch(err){
		return {code:500,msg:"token invalid"};
	}
}
const generateBase32Secret = () => {
  const base32 = encode(privateKey).replace(/=/g, "").substring(0, 24);
  return base32;
};

module.exports = { encryptData, decryptData, verifyToken, generateToken, generateBase32Secret };