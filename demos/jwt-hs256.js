var jwt = require("jsonwebtoken");

// deepcode ignore HardcodedNonCryptoSecret: this is just a demo, deepcode ignore HardcodedSecret: this is just a demo
var secretKey = "secret-key";

var payload = {
  name: "Alice",
};

// create a JWT
var newToken = jwt.sign(payload, secretKey, {
  algorithm: "HS256",
});

console.log("JWT created:", newToken);
