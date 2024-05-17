import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
	process.env.MYSQL_ADDON_DB! || process.env.DB_NAME!,
	process.env.MYSQL_ADDON_USER! || process.env.DB_USER!,
	process.env.MYSQL_ADDON_PASSWORD || process.env.DB_PASSWORD!,
	{
		host: process.env.MYSQL_ADDON_HOST || process.env.DB_HOST!,
		dialect: 'mysql',
		port:
			parseInt(process.env.MYSQL_ADDON_PORT!) || parseInt(process.env.DB_PORT!),
	}
);

export default sequelize;
