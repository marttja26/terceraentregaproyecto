import cors from 'cors';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { config } from './config.js';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import routerUser from './routes/routesUser.js';
import routerProductos from './routes/routesProductos.js';
import routerOrders from './routes/routesOrders.js';
import passport from './passport/setup.js';
import cluster from 'cluster';
import os from 'os';
import logger from './logger/logger.js';

const numCPUs = os.cpus().length;

const { PORT, MODO } = yargs(hideBin(process.argv))
	.alias({ p: 'PORT', m: 'MODO' })
	.default({ PORT: config.PORT || 8080, MODO: 'FORK' }).argv;

const app = express();
mongoose
	.connect(config.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(logger.info('conectado a la DB'))
	.catch((err) => logger.error(`Error al conectarse a la DB ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: config.MONGO_URL,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
		}),

		secret: 'secret',
		resave: false,
		saveUninitialized: true,
		rolling: true,
		cookie: {
			maxAge: 1000 * 60 * 10,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use('/', express.static('public'));

app.get('/info', (req, res) => {
	const { method, url } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	res.json({
		modo: MODO,
		PUERTO: PORT,
		'Numero de procesadores presentes': numCPUs,
		'Argumentos de Entrada': process.argv.splice(2),
		'Sistema Operativo': process.platform,
		'Version de node.js': process.version,
		'Memoria total reservada': process.rss,
		'Path de ejecucion': process.execPath,
		'Process id': process.pid,
		'Carpeta del proyecto': process.argv[1],
	});
});

app.use('/', routerUser);
app.use('/', routerProductos);
app.use('/', routerOrders);
app.use((req, res) => {
	// HANDLE UNMATCHED ROUTES
	const { method, url } = req;
	logger.warn(` Ruta ${method} ${url} no implementada.`);
	res.json({
		message: `Ruta ${method} ${url} no implementada.`,
	});
});

if (MODO === 'FORK') {
	const srv = app.listen(PORT, () => {
		logger.info(
			`Servidor Http con Websockets escuchando en el puerto ${
				srv.address().port
			} -PID WORKER ${process.pid}`
		);
	});
	srv.on('error', (error) => logger.error(` Error en el servidor ${error}`));
}
if (MODO === 'CLUSTER') {
	if (cluster.isMaster) {
		logger.info(`Master PID ${process.pid}`);
		for (let index = 0; index < numCPUs; index++) {
			cluster.fork();
		}

		cluster.on('exit', (worker, code, signal) => {
			logger.info(`worker ${worker.process.pid} died`);
			cluster.fork();
		});
	} else {
		const srv = app.listen(PORT, () => {
			logger.info(
				`Servidor Http con Websockets escuchando en el puerto ${
					srv.address().port
				} -PID WORKER ${process.pid}`
			);
		});
		srv.on('error', (error) => logger.error(` Error en el servidor ${error}`));
	}
}
