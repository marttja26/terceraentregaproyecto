
import { createTransport } from 'nodemailer';
import logger from '../logger/logger.js';
import {config} from '../config.js'

const sendEmail = async (subject,html) => {
    const trasporter = createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: "midireccion@gmail.com",
            pass: config.gmail.pwd
        }
    })

    const mailOptions = {
        from: "Servidor Node.js",
        to: "miOtraDireccion@gmail.com",
        subject: subject,
        html: html
    }

    try {
        const info = await trasporter.sendMail(mailOptions)
    } catch (error) {
        logger.error(error)
    }
}

export {
    sendEmail
}