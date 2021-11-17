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
      name,
      username,
      password,
      confirm_password,
      checkLogin,
    } = req.body;
    console.log("body", req.body);

    if (password !== confirm_password) {
        console.log("Password did not match");
        return res.send({ success: false, message: "Password did not match" });
    }

    User.find({
      $or: [{ email: email }, { username: username }],
    })
    .exec()
    .then((user) => {
      //console.log("user is: ", user);
      if (user.length >= 1) {
        let message;
        if (user[0].email === email) message = "Email already exists";
        else message = "User name already exists";
        res.send({ success: false, message: message });
      } 
      else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            res.send({ success: false, message: err });
          } else {
            const user = new User({
              email: email,
              name: name,
              username: username,
              password: password,
              confirm_password: confirm_password,
              checkLogin: checkLogin,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.send({
                  success: true,
                  message: "User successfully added",
                });
              })
              .catch((err) => {
                console.log(err);
                res.send({ success: false, message: err });
              });
          }
        });
      }
    });
});

module.exports = router;


