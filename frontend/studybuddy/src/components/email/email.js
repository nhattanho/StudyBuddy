/**
 * Creates an email from "studybuddy.com"
 * Note: mandrill has a 2000 email limit per account, so don't run this excessively
 * @author Chanel Young
 * @param {string} message - email content
 * @param {string} subject - email subject line
 * @param {string} recipient - email of recipient
 * @return {boolean} - result of sending email
 */
function create_email(message, subject, recipient){
    console.log("aslfdkjsdf");
    const nodemailer = require("nodemailer");
    const mandrillTransport = require('nodemailer-mandrill-transport');

    var smtpTransport = nodemailer.createTransport(mandrillTransport({
        auth: {
        apiKey : 'b24ddf35fb67f9e79283ead105c54086-us20'
        }
    }));

    let mailData={
    from : 'studybuddy@studybuddy.com',
    to : recipient,
    subject : subject,
    html : message
    };

    smtpTransport.sendMail(mailData, function(error, response){
    if(error) {
        console.log(error);
        console.log("Error in sending email");
        return false; 
    }
    console.log("Message sent: " + JSON.stringify(response));
    return true; 
    });
}

/**
 * New Session email
 * @author Chanel Young
 * @param {string} zoomlink - link of zoom email
 * @param {string} recipient1 - email of recipient 1
 * @param {string} recipient2 - email of recipient 2
 * @return {boolean} - result of sending email
 */

/**
 * New account email
 * @author Chanel Young
 * @param {string} message - email content
 * @param {string} subject - email subject line
 * @param {string} recipient - email of recipient
 * @return {boolean} - result of sending email
 */

 console.log(create_email("hello there", "this is a subject","chanelyoung99@gmail.com"))