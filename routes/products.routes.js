// routes/products.routes.js
import { Router } from 'express';
import * as productsController from '../controllers/products.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// GET /api/products (público)
router.get('/', productsController.getAllProducts);

// GET /api/products/:id (público)
router.get('/:id', productsController.getProductById);

// POST /api/products/create (protegido)
router.post(
  '/create',
  authenticateJWT,
  productsController.createProduct
);

// PUT /api/products/:id / (protegido)
router.put(
  '/:id',
  authenticateJWT,
  productsController.updateProduct
);

// DELETE /api/products/:id (protegido)
router.delete(
  '/:id',
  authenticateJWT,
  productsController.deleteProduct
);

export default router;

