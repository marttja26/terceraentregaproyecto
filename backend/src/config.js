import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
	MONGO_URL: process.env.MONGO_URL,
	PORT: process.env.PORT,
	gmail: {
		pwd: process.env.GMAIL_PWWD
	},
	twilio: {
        ID: process.env.ACCOUNT_SID_TWILIO,
        TOKEN: process.env.AUTH_TOKEN_TWILIO
    }
};
