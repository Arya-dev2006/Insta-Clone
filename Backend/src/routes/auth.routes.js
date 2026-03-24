const express = require("express");
const identifyUser = require("../middleware/auth.middleware");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller")
authRouter.post('/register',authController.registerController);
authRouter.post('/login',authController.loginController);
authRouter.get('/get-me',identifyUser,authController.getMeController);
module.exports = authRouter;