const UserModel = require("../models/user.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const statusCode = require("../utils/https.status.code.utils");

const checkValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
};

const hashPassword = async (req) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
  }
};

class UserController {
  async authorization(req, res, next) {
    const token = jwt.sign(process.env.KEY, process.env.SECRET_JWT);
    res.status(200).send({
      message: statusCode[200].message,
      token: token,
    });
    res.end();
  }

  async getAllUsers(req, res, next) {
    let userList = await UserModel.find();
    if (!userList.length) {
      res.status(404).send({
        message: statusCode[404].message,
        description: "No users not found",
      });
      res.end();
    }

    userList = userList.map((user) => {
      const { PASSWORD, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.send(userList);
  }

  async getUserById(req, res, next) {
    checkValidation(req, res);
    const user = await UserModel.findOne({ id: req.params.uid });
    if (!user) {
      res.status(404).send({
        message: statusCode[404].message,
        description: "User not found",
      });
      res.end();
    }

    const { PASSWORD, ...userWithoutPassword } = user;

    res.send(userWithoutPassword);
  }

  async getUserByuserName(req, res, next) {
    checkValidation(req, res);
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) {
      res.status(404).send({
        message: statusCode[404].message,
        description: "User not found",
      });
      res.end();
    }

    const { PASSWORD, ...userWithoutPassword } = user;

    res.send(userWithoutPassword);
  }

  async getCurrentUser(req, res, next) {
    const { PASSWORD, ...userWithoutPassword } = req.currentUser;

    res.send(userWithoutPassword);
  }

  async createUser(req, res, next) {
    checkValidation(req, res);

    await hashPassword(req);

    const result = await UserModel.create(req.body);

    if (!result) {
      res.status(500).send({
        message: statusCode[500].message,
        description: "Something went wrong",
      });
      res.end();
    }

    res.status(201).send("User was created! " + result);
  }

  async updateUser(req, res, next) {
    checkValidation(req, res);

    await hashPassword(req);

    const { confirm_password, ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await UserModel.update(restOfUpdates, req.params.uid);

    if (!result) {
      res.status(404).send({
        message: statusCode[404].message,
        description: "Something went wrong",
      });
      res.end();
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "User not found"
      : affectedRows && changedRows
      ? "User updated successfully"
      : "Updated faild";

    res.send({ message, info });
  }

  async deleteUser(req, res, next) {
    const result = await UserModel.delete(req.params.uid);
    if (!result) {
      res.status(404).send({
        message: statusCode[404].message,
        description: "User not found",
      });
      res.end();
    }
    res.send("User has been deleted");
  }

  async userLogin(req, res, next) {
    checkValidation(req, res);

    const { email, password: pass } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(401).send({
        message: statusCode[401].message,
        description: "User does not exit. Register now!",
      });
      res.end();
    }

    const isMatch = await bcrypt.compare(pass, user.PASSWORD);

    if (!isMatch) {
      res.status(401).send({
        message: statusCode[401].message,
        description: "Incorrect password!",
      });
      res.end();
    }

    // user matched!
    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({ user_id: user.email.toString() }, secretKey, {
      expiresIn: "24h",
    });
    // user.PASSWORD = null;
    const { PASSWORD, ...userWithoutPassword } = user;

    res.send({ ...userWithoutPassword, token });
    res.end();
  }
}

module.exports = new UserController();
