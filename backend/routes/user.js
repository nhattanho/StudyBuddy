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
const bcrypt = require("bcryptjs");
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
              password: hash,
              confirm_password: hash,
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

/*======================================GET method for login===================================*/
async function checkPass(user, password) {
  /*compare input password with hashed password in db*/
  const match = await bcrypt.compare(password, user.password);
  return match;
}

/* User login for requesting http://localhost:5000/user/login
 body: {email, password} */
router.get("/login", (req, res) => {
  const { email, password } = req.query;

  if (email.length > 0 && password.length > 0) {
    /*find user with given email in the database*/
    User.findOne({ email: email }, async (err, user) => {
      /*no user in database has specified email*/
      if (!user) {
        console.log("User does not exists");
        res.send({ success: false, message: "User does not exist!" });
      } else {
        /*email exists but incorrect password*/
        let match = await checkPass(user, password);
        if (!match) {
          console.log("Email exists but incorrect password");
          res.send({
            success: false,
            message: "Incorrect password",
          });
        } else {
        //   /*email and passwords match*/
          console.log("Success: email and password match");
          res.send({ success: true, message: "Successful login!" });
        }
      }
    });
  } else {
    console.log("No inputted email or password");
    res.send({
      success: false,
      message: "Email or Password can not be empty!",
    });
  }
});

/*======================================GET method for get user's information===================================*/
/*http://localhost:5000/user/:email/information*/
router.get("/:email/information", async (req, res) => {
  const { email } = req.params;
  console.log("Inside get information");
  /* Check if portfolio exist*/
  User.findOne({ email: email }, async (err, user) => {
    console.log("user", user);
    if (user) {
      res.send({ success: true, message: "Success!", user: user });
    } else {
      res.send({
        success: false,
        message: `User does not exist for ${email}`,
      });
    }
  });
});
