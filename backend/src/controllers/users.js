import passport from 'passport';
import logger from '../logger/logger.js';
import { sendEmail } from '../utils/mail.js';
import users from '../negocio/users.js';

const getUserController = (req, res) => {
	const { method, url, user } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	res.json(users.getUser(user));
};

const getAuth = (req, res) => {
	const { method, url } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	res.json({ token: true });
};

const logoutController = (req, res) => {
	const { method, url, session } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	res.json(users.logout(session));
};

const registerController = (req, res, next) => {
	passport.authenticate('register', async (err, user, info) => {
		if (err) {
			return next(err);
		} else {
			await sendEmail(
				'Nuevo Registro',
				`
				<p>Datos de nuevo usuario:</p>
				<h1>${user.name} [${user.age}]</h1>
				<p>Email: ${user.email}</p>
				<p>Dirección: ${user.address}</p>
				<p>Teléfono: ${user.phone}</p>
			`
			);
			return res.json(info);
		}
	})(req, res, next);
};

const loginController = (req, res, next) => {
	passport.authenticate('login', (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json(info);
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			return res.json(info);
		});
	})(req, res, next);
};

export default {
	getUserController,
	getAuth,
	logoutController,
	registerController,
	loginController,
};
