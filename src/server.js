const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookies = require("cookie-parser");
const helmet = require("helmet");
const userRouter = require("./routes/user.route");
const log = require("./utils/logger.utils");

const app = express();
dotenv.config();
const port = Number(process.env.PORT || 3331);

app.use(helmet());
app.use(cors());
app.options("*", cors());
app.use(cookies());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Welcome to home page!");
});

app.listen(port, () => log.info(`🚀 Server running on port ${port}!`));
userRouter(app);

// module.exports = app;
