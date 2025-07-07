// controllers/products.controller.js
import * as productService from '../services/products.service.js';

// GET /api/products - Filtros opcionales
export async function getAllProducts(req, res, next) {
  try {
    const { titulo, categoria, descripcion } = req.query;
    const filters = { titulo, categoria, descripcion };
    const products = await productService.getAllProducts(filters);
    res.json(products);
  } catch (err) {
    next(err);
  }
}

//GET /api/products/:id
export async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
}

//POST /api/products/create
export async function createProduct(req, res, next) {
  try {
    const data = req.body;
    const newProduct = await productService.createProduct(data);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
}

//DELETE /api/products/:id
export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    next(err);
  }
}
