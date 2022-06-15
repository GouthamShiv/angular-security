var jwt = require("jsonwebtoken");

// verify an existing JWT
var existingToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE2NTI2OTUxNzN9.NuBwFNVUUg13cRMHPPIrvs6Ls_ydkXIPwZgk5pPyMEA";

// deepcode ignore HardcodedNonCryptoSecret: this is just a demo, deepcode ignore HardcodedSecret: this is just a demo
var secretKey = "secret-key";

const verify = jwt.verify(existingToken, secretKey);

console.log("Decoded JWT:", verify);
