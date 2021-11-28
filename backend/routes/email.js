/**
 * @file Adds the following routes for zoom API:
 * zoom/create
 * @author Chanel Young
 */

 const express = require("express");
 const router = express.Router();
 const bodyParser = require('body-parser');
 const nodemailer = require("nodemailer");

/**
 * Endpoint for creating and sending a zoom link email
 * @author Chanel Young
 * @swagger
 *
 * /email/create:
 *   post:
 *     summary: Creates and sends a new zoom link email
 *     tags: [Email]
 *     description: Creates and sends an email containing the study session zoom link to both participants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Message content of the email, contains the zoom link
 *               subject:
 *                 type: string
 *                 description: Subject line of the email
 *               recipient:
 *                 type: string
 *                 description: Email of the user to send to
 */
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