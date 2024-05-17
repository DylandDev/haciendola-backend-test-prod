import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
	const headerToken = req.headers['authorization'];
	console.log(headerToken);

	if (headerToken && headerToken.startsWith('Bearer ')) {
		try {
			const bearerToken = headerToken.slice(7);
			console.log(bearerToken);
			jwt.verify(bearerToken, process.env.SECRET_KEY!, (err: any) => {
				if (err) {
					res.status(401).json({
						status: false,
						message: 'Token no válido',
					});
				} else {
					next();
				}
			});
		} catch (error) {
			res.status(500).json({
				status: false,
				message: 'Error del servidor',
			});
		}
	} else {
		res.status(401).json({
			status: false,
			message: 'Acceso denegado',
		});
	}
};

export default validateToken;
