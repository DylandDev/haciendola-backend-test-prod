import { Router } from 'express';
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProducts,
	updateProduct,
} from '../controllers/product.controllers';
import validateToken from './validate-token';

const router = Router();

router.get('/products', validateToken, getProducts);
router.get('/products/:id', validateToken, getProduct);
router.post('/products', validateToken, createProduct);
router.put('/products/:id', validateToken, updateProduct);
router.delete('/products/:id', validateToken, deleteProduct);

export default router;
