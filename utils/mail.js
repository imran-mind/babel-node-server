// import nodemailer from 'nodemailer';
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

export const sendEmail = async (data) => {
    try {
        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'shaikhimran115@gmail.com',
                pass: 'fvl@3133'
            }
        }));

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'shaikhimran115@gmail.com', // sender address
            to: data.email, // list of receivers
            subject: "Welcome to Institute Management System", // Subject line
            text: "Hi "+data.name, // plain text body
            html: "<b>Congratulations "+data.name+" for choosing us</b> "+
                " Your id is : "+data._id  // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        return info && info.messageId;
    } catch (error) {
        console.log('-->error -< -', error);
        return error;
    }
}

