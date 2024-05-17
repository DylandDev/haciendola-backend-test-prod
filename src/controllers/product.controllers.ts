import { Request, Response } from 'express';
import { Product } from '../models/product';

export const getProducts = async (_: Request, res: Response) => {
	try {
		const listProducts = await Product.findAll();

		res.status(200).json({
			success: true,
			data: listProducts,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Ocurrió un error interno en el servidor',
		});
	}
};

export const createProduct = async (req: Request, res: Response) => {
	try {
		const { body } = req;
		await Product.create(body);

		res.json({
			success: true,
			message: 'El producto ha sido creado con éxito.',
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: 'Ocurrió un error interno en el servidor',
		});
	}
};

export const getProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (product) {
			res.json({
				success: true,
				data: product,
			});
		} else {
			res.status(404).json({
				success: false,
				message: `No existe un product con el id ${id}`,
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			error: 'Ocurrió un error interno en el servidor',
		});
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	try {
		const { body } = req;
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (product) {
			await product.update(body);

			res.json({
				success: true,
				message: 'El producto ha sido actualizado con éxito.',
			});
		} else {
			res.status(404).json({
				success: false,
				message: `No existe un product con el id ${id}`,
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			error: 'Ocurrió un error interno en el servidor',
		});
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);

		if (product) {
			await product.destroy();
			res.json({
				success: true,
				message: 'El producto fue eliminado con éxito',
			});
		} else {
			res.status(404).json({
				success: false,
				message: `No existe un product con el id ${id}`,
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			error: 'Ocurrió un error interno en el servidor',
		});
	}
};
