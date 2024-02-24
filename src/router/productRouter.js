import express from 'express';
import ProductController from '../controllers/product.js';
const router = express.Router();

const productController = new ProductController();
router.route('/').get(productController.getProducts);


export default router;