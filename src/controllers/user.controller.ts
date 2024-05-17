import { Request, Response } from 'express';
import { UserDB } from '../models/user';
import bcrypt from 'bcrypt';
import { User } from '../interfaces/User';
import jwt from 'jsonwebtoken';
import { LoginSchema } from '../utils/validations/auth.validation';
import { IAuthDTO } from '../types';

export const newUser = async (req: Request, res: Response) => {
	const authDTO: IAuthDTO = req.body;

	try {
		await LoginSchema.validateAsync(authDTO, {
			abortEarly: false,
		});

		const user = await UserDB.findOne({
			where: { username: authDTO.username },
		});

		if (user) {
			return res.status(400).json({
				status: false,
				message: `Ya existe un usuario con el nombre ${authDTO.username}`,
			});
		}

		const hashedPassword = await bcrypt.hash(authDTO.password, 10);
		await UserDB.create({
			username: authDTO.username,
			password: hashedPassword,
		});

		return res.status(201).json({
			status: true,
			message: `El usuario ${authDTO.username} ha sido creado exitosamente!`,
		});
	} catch (error: any) {
		if (error.isJoi) {
			const errorMessage = error.details.map((detail: any) => detail.message);
			return res.status(400).json({
				status: false,
				message: errorMessage,
			});
		} else {
			return res
				.status(500)
				.json({ status: false, error: 'Error interno del servidor' });
		}
	}
};

export const login = async (req: Request, res: Response) => {
	const authDTO: IAuthDTO = req.body;

	try {
		await LoginSchema.validateAsync(authDTO, {
			abortEarly: false,
		});

		const user = (await UserDB.findOne({
			where: { username: authDTO.username },
		})) as User | null;

		if (!user) {
			return res.status(400).json({
				status: false,
				message: 'Credenciales inválidas',
			});
		}
		const passwordValid = await bcrypt.compare(authDTO.password, user.password);

		if (!passwordValid) {
			return res.status(400).json({
				status: false,
				message: 'No existe el usuario y/o la contraseña',
			});
		}

		const token = jwt.sign(
			{
				username: authDTO.username,
			},
			process.env.SECRET_KEY!
		);

		return res.json({
			status: true,
			token,
		});
	} catch (error: any) {
		if (error.isJoi) {
			const errorMessage = error.details.map((detail: any) => detail.message);
			return res.status(400).json({
				status: false,
				message: errorMessage,
			});
		} else {
			return res
				.status(500)
				.json({ status: false, error: 'Error interno del servidor' });
		}
	}
};
