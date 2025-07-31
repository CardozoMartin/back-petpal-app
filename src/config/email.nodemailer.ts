import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: "martincardozo1993xp@gmail.com",
        pass: "sdko cvlf fmbp nykh"
    }
})

export default transporter;