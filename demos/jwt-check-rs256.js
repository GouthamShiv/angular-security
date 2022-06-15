var jwt = require("jsonwebtoken");
var fs = require("fs");

// verify an existing JWT
var existingToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE2NTI3MDA0NjMsImV4cCI6MTY1MjcwMDU4Mywic3ViIjoiMSJ9.WLIYPgK1J8ZT_hahAeLA-vOuSVGfDkM_41Lr4eDhIqTqBuA9xuevCkDMtPmjEp9RGUgB_uZX4OZSa6rWM6NzvDMOzyQ88wCu91V31ogV4MnlixaEa4cOZ13LXbTHsTsvvqGbUb4VJPz2-g9JIPWMPgYpTtXw4bGtbmdJ3-7-JKXoP6x5zoytjeJhabOkLC6cynKX3yavxUYl8A_bKuTxjkTC0PgihovAdgWWezmr8SO0nn4G0RpRhr-emCjnYrl5qABfHqMkgNC3cAJrhuZqiaslToLuCDbgKr8zrQqOBbcJwYEF02y2pZ0CmS5-h8EYLuDEf_LQ_mldc5n_QjfGmg";

var publicKey = fs.readFileSync("./demos/public.key");

console.log("verifying");

const verify = jwt.verify(existingToken, publicKey);

console.log("Decoded JWT:", verify);
