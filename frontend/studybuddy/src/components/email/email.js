/**
 * Creates an email from the studybuddy gmail
 * Note: gmail has a 500 email limit per day, and these tend to be marked as spam
 * @author Chanel Young
 * @param {string} message - email content
 * @param {string} subject - email subject line
 * @param {string} recipient - email of recipient
 * @return {boolean} - result of sending email
 */

async function create_email(message, subject, recipient) {
    const nodemailer = require("nodemailer");
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

    let info = await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return false; 
        } else {
            console.log('Email sent: ' + info.response);
            return true; 
        }
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
async function create_accept_request_email(zoomlink, recipient1, recipient2) {
    let message = "Thank you for scheduling your study session with StudyBuddy, here's your link: " + zoomlink;
    let subject = "Your StudyBuddy zoom link";  
    return create_email(message, subject, recipient1) && create_email(message, subject, recipient2);
}

//console.log(create_email("hello there", "this is a subject","chanelyoung99@gmail.com"))
//console.log(create_accept_request_email("google.com", "chanelyoung99@gmail.com", "chanelyoung99@gmail.com"))

