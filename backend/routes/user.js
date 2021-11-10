/* =======================================================================*/
/**
* This is REST API for user: register, login
* @author NhatHo
*/
/* =======================================================================*/
const express = require("express");
const router = express.Router();
const User = require("../model/usersModel");

//for hashing passwords
const bcrypt = require("bcrypt");
const saltRounds = 10;

/*======================================POST method===================================*/

/* Register a user for requesting http://localhost:5000/user/register */
router.post("/register", (req, res) => {
    const {
      email,
      firstName,
      lastName,
      password,
      confirm_password,
      username,
      checkLogin,
    } = req.body;
    console.log("body", req.body);

    if (password !== confirm_password) {
        console.log("Password did not match");
        return res.send({ success: false, message: "Password did not match" });
    }
    /*Continue working on it*/
});

module.exports = router;


