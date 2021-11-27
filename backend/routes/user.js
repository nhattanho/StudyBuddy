/* =======================================================================*/
/**
* @file This is REST API for user
* @author NhatHo
*/
/* =======================================================================*/
const express = require("express");
/**
 * Express router for user endpoints
 * @namespace UserRoutes
 */
const router = express.Router();
const User = require("../model/usersModel");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId; 

//for hashing passwords
const bcrypt = require("bcryptjs");
const saltRounds = 10;

/*======================================POST method===================================*/
/**
 * Register a user account
 * http://localhost:5000/user/register
 *
 * @author Nhat Ho
 * @name GET/register
 * @function
 * @memberof UserRoutes

 * @param {string} email - User's email address
 * @param {string} name - User's full name
 * @param {string} username - User's account username
 * @param {string} password - User's account password
 * @param {string} confirm_password - Password confirmation for validation
 * @param {boolean} checkLogin - Whether or not to check for login
 *
 * @returns {boolean} success - Whether the request was successful of not
 * @returns {string} message - Either a success message or error message depending on results
 */
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

/*======================================POST method to reset password===================================*/
/**
 * Reset the user's password
 * http://localhost:5000/user/resetPassword
 *
 * @author Nhat Ho
 * @name POST/resetPassword
 * @function
 * @memberof UserRoutes
 *
 * @param {string} email - User's email address
 */
router.post("/resetPassword", (req, res) => {
  const {email} = req.body;
  User.findOne({
    where: { email: email }
  })
  .exec()
  .then((user) => {
    if(user === null){
      console.log('email not in DB');
      res.send({ success: false, message: "Email does not exist!" });
    } 
    else {
      const token = crypto.randomBytes(20).toString('hex');
      console.log("test token " + token);
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000, //expire in 1 hour
      });
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,//will update later for env
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });
    }
  });
});


/*======================================GET method for normal login===================================*/
async function checkPass(user, password) {
  /*compare input password with hashed password in db*/
  const match = await bcrypt.compare(password, user.password);
  return match;
}

/**
 * Endpoint for study buddy user login
 * http://localhost:5000/user/login
 *
 * @author Nhat Ho
 * @name GET/login
 * @function
 * @memberof UserRoutes
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's account password
 *
 * @returns {boolean} success - Whether the request was successful of not
 * @returns {string} message - Either a success message or error message depending on results
 */
router.get("/login", (req, res) => {
  const { email, password } = req.query;

  /*console.log(email);*/

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
          res.send({ success: true, id: user._id, message: "Successful login!" });
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

/*======================================GET method for Facebook login===================================*/
/**
 * Endpoint for user login
 * http://localhost:5000/user/facebookLogin
 * 
 * @author Nhat Ho
 * @name GET/facebookLogin
 * @function
 * @memberof UserRoutes
 *
 * @param {string} email - User's email address
 *
 * @returns {boolean} success - Whether the request was successful of not
 * @returns {string} message - Either a success message or error message depending on results
 */
router.get("/facebookLogin", (req, res) => {
  const { email } = req.query;

  if (email.length > 0) {
    /*find user with given email in the database*/
    User.findOne({ email: email }, async (err, user) => {
      /*no user in database has specified email*/
      if (!user) {
        console.log("User does not exists");
        res.send({ success: false, message: "User does not exist!" });
      } else {
        console.log("Success: email matched");
        res.send({ success: true, message: "email existed!", user: user });
      }
    });
  } else {
    console.log("No inputted email");
    res.send({
      success: false,
      message: "Email can not be empty!",
    });
  }
});

/*======================================GET method for get user's information===================================*/
/**
 * Endpoint to retrieve user information based on email
 * http://localhost:5000/user/:email/information
 * 
 * @author Nhat Ho
 * @name GET/:email/information
 * @function
 * @memberof UserRoutes
 *
 * @param {string} email - User's email address
 *
 * @returns {object} user - User object containing information pertaining to user
 * @returns {boolean} success - Whether the request was successful of not
 * @returns {string} message - Either a success message or error message depending on results
 */
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

/*======================================GET method for get user's information based on id===================================*/
/**
 * Endpoint to retrieve user information based on email
 * http://localhost:5000/user/:id
 * 
 * @author Nhat Ho
 * @name GET/:id
 * @function
 * @memberof UserRoutes
 *
 * @param {string} id - User's MongoDB object ID
 *
 * @returns {object} user - User object containing information pertaining to user
 * @returns {boolean} success - Whether the request was successful of not
 * @returns {string} message - Either a success message or error message depending on results
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("The id is " + id);
  /* Check if portfolio exist*/
  User.findOne({_id: new ObjectId(id) }, async (err, user) => {
    console.log("user", user);
    if (user) {
      res.send({ success: true, message: "Success!", user: user });
    } else {
      res.send({
        success: false,
        message: `User does not exist for ${id}`,
      });
    }
  });
});

/*======================================PUT method===================================*/
/**
 * Endpoint to retrieve user information based on email
 * http://localhost:5000/user/email/update
 * 
 * @author Nhat Ho
 * @name PUT/email/update
 * @function
 * @memberof UserRoutes
 *
 * @param {object} body - Object containing fields and information to update for the user
 *
 * @returns {boolean} success - Whether the request was successful of not
 * @returns {string} message - Either a success message or error message depending on results
 */
router.put("/email/update", (req, res) => {
  let updateObject = req.body;
  /*console.log("updateObject: " + updateObject.email);*/
  User.findOneAndUpdate({ email: req.body.email }, updateObject, {
    new: true,
  })
  .exec()
  .then((data) => {
    console.log("Updated data", data);
    res.send({
      success: true,
      message: "Information updated",
    });
  })
  .catch((err) => {
    console.log("update fail in backend log");
    res.send({
      success: false,
      message: `Update failed, error is ${err}`,
    });
  });
});

/*======================================DELETE method===================================*/
/**
 * Endpoint to delete a user's account
 * http://localhost:5000/user/delete/:email
 * 
 * @author Nhat Ho
 * @name DELETE/:email
 * @function
 * @memberof UserRoutes
 *
 * @param {string} email - User's email address
 *
 * @returns {boolean} success - Whether the request was successful of not
 * @returns {string} message - Either a success message or error message depending on results
 */
router.delete("/delete/:email", async (req, res) => {
  console.log("In delete user account");
  const { email } = req.params;
  User.findOneAndRemove({ email: email }, (err, user) => {
    console.log(user);
    if (err) {
      res.send({
        success: false,
        message: err,
      });
    }
    if (user) {
      res.send({
        success: true,
        message: "Deleted Successfully!",
        action: "deleted",
      });
    } else {
      res.send({
        success: false,
        message: "Deleted Failed!",
      });
    }
  });
});

module.exports = router;