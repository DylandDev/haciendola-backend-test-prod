import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routesProduct from '../routes/product.routes';
import routesUser from '../routes/user.routes';
import { Product } from './product';
import { UserDB } from './user';

class Server {
	private app: Application;
	private port: string;
	constructor() {
		this.app = express();
		this.port = process.env.PORT || '3000';
		this.listen();
		this.middlewares();
		this.routes();
		this.dbConnect();
	}

	private middlewares() {
		this.app.use(morgan('dev'));
		this.app.use(cors());
		this.app.use(express.json());
	}

	routes() {
		this.app.use('/api', routesUser);
		this.app.use('/api', routesProduct);
	}

	async dbConnect() {
		await Product.sync();
		await UserDB.sync();
		console.log('Connection has been established successfully.');
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Listening server on ${this.port}`);
		});
	}
}

export default Server;
