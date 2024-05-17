import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Product = sequelize.define(
	'product',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		handle: {
			type: DataTypes.STRING,
		},
		title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		sku: {
			type: DataTypes.STRING,
		},
		grams: {
			type: DataTypes.DECIMAL(10, 2),
		},
		stock: {
			type: DataTypes.INTEGER,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
		},
		comparePrice: {
			type: DataTypes.DECIMAL(10, 2),
		},
		barcode: {
			type: DataTypes.STRING,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
);
