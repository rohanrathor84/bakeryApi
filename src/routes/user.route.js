module.exports = (router) => {
  const userController = require("../controllers/user.controller");
  const middleware = require("../middleware/auth.middleware");
  const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");
  const validator = require("../middleware/validators/userValidator.middleware");
  const endpoint = require("../middleware/user.endpoint");

  router.post("/getAuth", userController.authorization);
  router.get(
    "/getUsers",
    [middleware.verifyToken],
    awaitHandlerFactory(userController.getAllUsers)
  );
  //   {
  //     "username": "rock",
  //     "first_name": "Dollar",
  //     "last_name": "dolly",
  //     "email": "rock@gmail.com",
  //     "role": "Admin",
  //     "password": "123456789",
  //     "confirm_password": "123456789",
  //     "age": "25"
  // }
  router.post(
    "/createUser",
    [validator.validate(endpoint.createUser)],
    awaitHandlerFactory(userController.createUser)
  );
  router.post(
    "/login",
    [validator.validate(endpoint.validateLogin)],
    awaitHandlerFactory(userController.userLogin)
  );
  router.get(
    "/getUserById/:uid",
    [middleware.verifyToken, validator.validate(endpoint.getUserById)],
    awaitHandlerFactory(userController.getUserById)
  );
  router.get(
    "/getUserByuserName/:username",
    [middleware.verifyToken, validator.validate(endpoint.getUserByuserName)],
    awaitHandlerFactory(userController.getUserByuserName)
  );
  router.get(
    "/whoami",
    [middleware.verifyToken],
    awaitHandlerFactory(userController.getCurrentUser)
  );
  router.patch(
    "/updateUser/:uid",
    [middleware.verifyToken, validator.validate(endpoint.updateUser)],
    awaitHandlerFactory(userController.updateUser)
  );
  router.delete(
    "/deleteUser/:uid",
    [middleware.verifyToken],
    awaitHandlerFactory(userController.deleteUser)
  );
};
