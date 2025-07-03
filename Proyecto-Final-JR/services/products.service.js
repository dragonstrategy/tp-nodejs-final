// services/products.service.js
import * as productoModel from '../models/producto.model.js';

/**
 * Obtiene todos los productos.
 */
export async function getAllProducts() {
  return await productoModel.obtenerTodos();
}

/**
 * Obtiene un producto por ID.
 * @param {string} id
 */
export async function getProductById(id) {
  return await productoModel.obtenerPorId(id);
}

/**
 * Crea un producto.
 * @param {{titulo:string, precio:number, categoria:string, descripcion:string}} data
 */
export async function createProduct(data) {
  return await productoModel.crear(data);
}

/**
 * Elimina un producto por ID.
 * @param {string} id
 */
export async function deleteProduct(id) {
  // retorna true si borró, false si no existía
  return await productoModel.eliminar(id);
}

