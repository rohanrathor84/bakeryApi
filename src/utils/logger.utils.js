const winston = require("winston");
const winstonRotator = require("winston-daily-rotate-file");
const dotenv = require("dotenv");
dotenv.config();

const logger = winston.createLogger({
  level: "info",
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`
    ),
    winston.format.colorize()
  ),
  transports: [
    new winstonRotator({
      filename: __dirname + "/logs" + "/error-%DATE%.log",
      level: "error",
    }),
    new winstonRotator({
      filename: __dirname + "/logs" + "/combined-%DATE%.log",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.colorize(),
        winston.format.printf(
          (info) =>
            `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`
        )
      ),
    })
  );
}

module.exports = logger;
