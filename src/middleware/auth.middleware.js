const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const log = require("../utils/logger.utils");
const statusCode = require("../utils/https.status.code.utils");

const middleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers["access-token"];

    if (!token) {
      res.status(401).send({
        status: 401,
        auth: false,
        message: statusCode[401].message,
        description: statusCode[401].description,
      });
      log.error("status: " + 401 + " message: " + statusCode[401].message);
    } else {
      jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
          log.error("status: " + 403 + " message: " + statusCode[403].message);
          return res.status(403).send({
            status: 403,
            auth: false,
            message: statusCode[403].message,
            description: statusCode[403].description,
          });
        }

        req = decoded;
        next();
      });
    }
  },
};

module.exports = middleware;
