import { Router } from 'express';
import { upload } from '../middlewares/middleware.js';
import passport from 'passport';
import { isAuth } from '../middlewares/middleware.js';
import logger from '../logger/logger.js';
import { sendEmail } from '../utils/mail.js';

const routerUser = new Router();

routerUser.get('/', isAuth, (req, res, next) => {
	const { method, url } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	res.redirect('/content');
});

routerUser.get('/user', isAuth, (req, res) => {
	const { method, url, user } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	const userCopy = { ...user._doc };
	const { password, __v, ...userWithoutPassword } = userCopy;
	res.json(userWithoutPassword);
});

routerUser.get('/auth', isAuth, (req, res) => {
	const { method, url } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	res.json({ token: true });
});

routerUser.get('/logout', isAuth, (req, res, next) => {
	const { method, url } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	req.session.destroy(function (err) {
		if (err) return next(err);
		res.json({ message: 'Se ha cerrado la sesion.' });
	});
});

routerUser.post('/register', upload.single('avatar'), (req, res, next) => {
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
});

routerUser.post('/login', (req, res, next) => {
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
});

export default routerUser;
