/**
 * @file Adds the following routes for zoom API:
 * zoom/create
 * @author Chanel Young
 */

 const express = require("express");
 const router = express.Router();
 const bodyParser = require('body-parser');
 const nodemailer = require("nodemailer");

router.post("/create", (req, res) => {
    const axios = require('axios');

    const {
        message,
        subject,
        recipient,
    } = req.body;

    let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, //we love security here at StudyBuddy
    auth: {
        user: 'studybuddycs130@gmail.com',
        pass: 'StudyBuddy123', 
    },
    });

    const mailOptions = {
        from: '"StudyBuddy 📚 " <studybuddycs130@gmail.com>', 
        to: recipient, 
        subject: subject, 
        text: message, 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return false; 
        } else {
            console.log('Email sent: ' + info.response);
            return true; 
        }
    });
});

module.exports = router;