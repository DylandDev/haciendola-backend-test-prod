import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const UserDB = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			field: 'create_at',
		},
		updateAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			field: 'update_at',
		},
	},
	{
		timestamps: false,
	}
);
