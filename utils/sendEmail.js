const {
    verificationEmailTemplate,
    welcomeEmailTemplate,
    resetPasswordEmailTemplate,
    newPasswordEmailTemplate
} = require("./templates/emailTemplates")
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendVerificationEmail = async (email, name, otp) => {
    try {
        let currentDateTime = new Date().toLocaleString();
        const info = await transporter.sendMail(
            {
                from: "Auth",
                to: email,
                subject: "OTP Varification" + currentDateTime,
                text: "Hello ✔",
                html: verificationEmailTemplate.replace("{verificationCode}", otp)
            }
        )
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

const welcomeEmail = async (email, name) => {
    try {
        let currentDateTime = new Date().toLocaleString();
        const info = await transporter.sendMail(
            {
                from: "Auth",
                to: email,
                subject: "Welcome" + name + currentDateTime,
                text: "Hello ✔",
                html: welcomeEmailTemplate.replace("{name}", name)
            }
        )
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

const resetPasswordEmail = async (email, reset_URL) => {
    try {
        let currentDateTime = new Date().toLocaleString();
        const info = await transporter.sendMail(
            {
                from: "Auth",
                to: email,
                subject: "Reset Password" + currentDateTime,
                text: "Hello ✔",
                html: resetPasswordEmailTemplate.replace("{resetURL}", reset_URL)
            }
        )
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

const newPasswordEmail = async (email) => {
    try {
        let currentDateTime = new Date().toLocaleString();
        const info = await transporter.sendMail(
            {
                from: "Auth",
                to: email,
                subject: "Password Update Successfully" + currentDateTime,
                text: "Hello ✔",
                html: newPasswordEmailTemplate
            }
        )
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendVerificationEmail,
    welcomeEmail,
    resetPasswordEmail,
    newPasswordEmail
}
