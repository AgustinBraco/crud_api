import { Router } from 'express';
import { isAuth, isAdmin } from '../middlewares/index.js';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/index.js';

export const productsRoute = Router();

// Route -> Controller
productsRoute.get('/', getProducts);
productsRoute.get('/:id', getProduct);
productsRoute.post('/', isAuth, isAdmin, createProduct);
productsRoute.put('/:id', isAuth, isAdmin, updateProduct);
productsRoute.delete('/:id', isAuth, isAdmin, deleteProduct);
