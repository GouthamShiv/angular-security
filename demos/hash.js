var crypto = require("crypto");

// deepcode ignore NoHardcodedPasswords: Just a training material
var password = "monkey";

var aliceSalt = 1;
var bobSalt = 2;

// we will use another hash other SHA-256 during the course, this is just for demo purposes
var hash = crypto
  .createHash("sha256")
  .update(password + bobSAlt)
  .digest("hex");

console.log("The result of hashing " + password + " is:\n\n" + hash + "\n\n");

// You should see in the console 000c285457fc971f862a79b786476c78812c8897063c6fa9c045f579a3b2d63f
