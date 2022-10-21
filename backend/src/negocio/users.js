import logger from '../logger/logger.js';

const getUser = (user) => {
	const userCopy = { ...user._doc };
	const { password, __v, ...userWithoutPassword } = userCopy;
	return userWithoutPassword;
};

const logout = (session) => {
	session.destroy(function (err) {
		if (err) {
			logger.error({ message: `error al cerrar sesion. ${err}` });
			return { message: 'No se pudo cerrar la sesion.' };
		}
		return { message: 'Se ha cerrado la sesion.' };
	});
};

export default {
	getUser,
	logout,
};
