const express = require("express");
const {signup,login} = require("../Controllers/auth-controller")
const {signupValidation,loginValidation} = require("../Middlewares/auth-validation");
const router = express.Router();

router.post("/login",loginValidation,login);

router.post("/signup",signupValidation,signup);

module.exports = router;
