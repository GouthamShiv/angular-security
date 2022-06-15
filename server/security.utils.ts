const util = require("util");
const cryptoVar = require("crypto");

export const randomBytes = util.promisify(cryptoVar.randomBytes);
