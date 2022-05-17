var crypto = require("crypto");

// deepcode ignore HardcodedSecret: this is just a demo, deepcode ignore NoHardcodedPasswords: this is just a demo
var password = "monkey";

crypto.randomBytes(256, function (err, salt) {
  // deepcode ignore HardcodedSecret: this is just a demo
  crypto.pbkdf2(password, salt, 100000, 512, "sha256", function (err, hash) {
    console.log(
      "The result of hashing " +
        password +
        " is:\n\n" +
        hash.toString("hex") +
        "\n\n"
    );
  });
});
