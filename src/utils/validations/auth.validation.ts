import Joi from 'joi';
import { IAuthDTO } from '../../types';

export const LoginSchema = Joi.object<IAuthDTO>({
	username: Joi.string().min(6).max(255).required().messages({
		'string.empty': `El usuario no debe estar vacia`,
		'string.email': `Debe ser un email valido`,
		'string.min': `Debe empezar con minimo de 6 digitos`,
		'string.max': `Debe empezar con max de 255 digitos`,
		'any.required': `El usuario es requerido`,
	}),
	password: Joi.string()
		.pattern(
			new RegExp(
				'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{6,})'
			)
		)
		.required()
		.messages({
			'string.base': `La contraseña debe ser texto`,
			'string.empty': `La contraseña no debe estar vacia`,
			'string.pattern.base': `La contraseña debe contener al menos una mayúscula, una minúscula, un caracter especial y un número, y tener al menos 6 caracteres`,
			'any.required': `La contraseña es requerida`,
		}),
}).messages({
	'object.unknown':
		'No se permiten campos adicionales aparte de email y password',
});
