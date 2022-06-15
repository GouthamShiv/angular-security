import * as express from "express";
import { Application } from "express";
import * as fs from "fs";
import * as https from "https";
import { readAllLessons } from "./read-all-lessons.route";
<<<<<<< HEAD
const bodyParser = require("body-parser");
const jwksRsa = require("jwks-rsa");
import { expressjwt } from "express-jwt";
import { userInfo } from "./user-info.route";

const app: Application = express();
=======
import { createUser } from "./create-user.route";
import helmet from "helmet";
import { getUser } from "./get-user.route";
import { logout } from "./logout.route";
import { login } from "./login.route";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app: Application = express().disable("X-Powered-By");
>>>>>>> 01-signup

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

const commandLineArgs = require("command-line-args");

const optionDefinitions = [
  { name: "secure", type: Boolean, defaultOption: true },
];

const options = commandLineArgs(optionDefinitions);

<<<<<<< HEAD
const checkIfAuthenticated = expressjwt({
  algorithms: ["RS256"],
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    cacheMaxEntries: 5,
    rateLimit: true,
    jwksUri: "https://webstash.us.auth0.com/.well-known/jwks.json",
  }),
});

app.use(checkIfAuthenticated);

app.use((err, req, res, next) => {
  if (err && err.name == "UnauthorizedError") {
    res.status(err.status).json({ message: err.message });
  } else {
    next();
  }
});

// REST API
app.route("/api/lessons").get(readAllLessons);

app.route("/api/userinfo").put(userInfo);
=======
// REST API
app.route("/api/lessons").get(readAllLessons);

app.route("/api/signup").post(createUser);

app.route("/api/user").get(getUser);

app.route("/api/logout").post(logout);

app.route("/api/login").post(login);
>>>>>>> 01-signup

if (options.secure) {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  );

  // launch an HTTPS Server. Note: this does NOT mean that the application is secure
  httpsServer.listen(9000, () =>
    console.log(
      "HTTPS Secure Server running at https://localhost:" +
        httpsServer.address().port
    )
  );
} else {
  // launch an HTTP Server
  const httpServer = app.listen(9000, () => {
    console.log(
      "HTTP Server running at https://localhost:" + httpServer.address().port
    );
  });
}
