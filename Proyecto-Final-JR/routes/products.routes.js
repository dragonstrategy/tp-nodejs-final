

// routes/products.routes.js
import { Router } from 'express';
import * as productsController from '../controllers/products.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// GET /api/products (público)
router.get('/api/products', productsController.getAllProducts);

// GET /api/products/:id (público)
router.get('/api/products/:id', productsController.getProductById);

// POST /api/products/create (protegido)
router.post(
  '/api/products/create',
  authenticateJWT,
  productsController.createProduct
);

// DELETE /api/products/:id (protegido)
router.delete(
  '/api/products/:id',
  authenticateJWT,
  productsController.deleteProduct
);

// **Exporta el router como default**
export default router;
