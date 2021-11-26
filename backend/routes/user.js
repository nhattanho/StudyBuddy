/* =======================================================================*/
/**
* This is REST API for user: register, login
* @author NhatHo
*/
/* =======================================================================*/
const express = require("express");
const router = express.Router();
const User = require("../model/usersModel");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var ObjectId = require('mongodb').ObjectId; 

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
                  message: "Congrat, You register successfully. Go to Login page!",
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

/*======================================POST method to update token reset password===================================*/
/* Register a user for requesting http://localhost:5000/user/resetPassword */
router.post("/resetPassword", (req, res) => {
  const {email} = req.body;
  const token = crypto.randomBytes(20).toString('hex');
  console.log("test token " + token);
  User.findOneAndUpdate({ email: email }, 
    {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000, //expire in 1 hour
    }, 
    {
      new: true,
    })
  .exec()
  .then((data) => {
    if(data === null){
      res.send({ success: false, message: "Email does not exist!"});
    }else {
      console.log("user after update", data);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });
      const mailOptions = {
        from: "studybuddycs130@gmail.com",
        to: `${email}`,
        subject: 'Link to reset your password',
        text:
          'You are receiving this email because you have requested the reset of password for your acount.\n\n '
          + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receving it:\n\n'
          + `http://localhost:3000/reset/${token}\n\n`
          + 'If you did not request it, please ignore this email and your password will remain unchanged.\n',
      };
  
      console.log('sending email');
      transporter.sendMail(mailOptions, (err, response) => {
        if(err) {
          console.error('There is an error: ', err);
          res.send({ success: false, message: "Could not send email since " + err + ". Please try again!" });
        }else {
          console.log("here is the res: ", response);
          res.send({ success: true, message: "Reset Password link was sent. Please check your email!" });
          res.status(200).json('recovery email sent');
        }
      });
    }
  })
  .catch((err) => {
      res.send({
        success: false,
        error: "Update token fail caused by" + err,
      });
  });
});

/*======================================GET method for normal login===================================*/
async function checkPass(user, password) {
  /*compare input password with hashed password in db*/
  const match = await bcrypt.compare(password, user.password);
  return match;
}

/* User login for requesting http://localhost:5000/user/login
 body: {email, password} */
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
/* User login for requesting http://localhost:5000/user/facebookLogin
 body: {email} */
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

/*======================================GET method for get user's information based on id===================================*/
/*http://localhost:5000/user/:id*/
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

/*======================================GET method for checking token expire===================================*/
/*http://localhost:5000/user/${token}/checkTokenPass*/
router.get("/:token/checkTokenPass", async (req, res) => {
  const { token } = req.params;
  console.log("The token is " + token);
  /* Check if portfolio exist*/
  User.findOne({resetPasswordToken: token, resetPasswordExpires:{$gt: Date.now(),} }, async (err, user) => {
    console.log("user", user);
    if (user) {
      console.log("email in checkTokenpass", user.email);
      res.send({ success: true, message: "password reset link ok!", email: user.email });
    } else {
      res.send({
        success: false,
        message: "Password reset link is invalid or has expired",
      });
    }
  });
});

/*======================================PUT method to update password===================================*/
/*http://localhost:5000/user/email/update*/
router.put("/updatePassword", (req, res) => {
  let email = req.body.email;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.send({ success: false, message: err });
    } else {
        console.log("hash is: ", hash);
        User.findOneAndUpdate({ email: email }, 
          {
            password: hash,
            confirm_password: hash,
          }, 
          {
            new: true,
          })
        .exec()
        .then((data) => {
          console.log("Updated password", data);
          res.send({
            success: true,
            message: "Password Update Successfully!",
          });
        })
        .catch((err) => {
          console.log("update fail in backend log");
          res.send({
            success: false,
            message: `Update failed, error is ${err}`,
          });
        });
      }
  });
});

/*======================================PUT method===================================*/
/*http://localhost:5000/user/email/update*/
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