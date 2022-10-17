
import twilio from "twilio";
import {config} from "../config.js";
import logger from "../logger/logger.js";

const accountID = config.twilio.ID;
const token = config.twilio.TOKEN;
const client = twilio(accountID,token);


const sendWhatsapp = async (html, phone) => {
    const option = {
        body: html,
        from: `whatsapp:+14156884237`,
        to: `whatsapp:+${phone}`
    }
    try{
        const message= await client.messages.create(option);
        logger.info(message)
    } catch (error) {
        logger.error(error)
    }
}

const sendSMS = async (html, phone) => {
    const option = {
        body: html,
        from: `+14156884237`,
        to: `+${phone}`
    }
    try{
        const message= await client.messages.create(option);
        logger.info(message)
    } catch (error) {
        logger.error(error)
    }
}

export {
    sendWhatsapp,
    sendSMS
}