// services/products.service.js
import * as productoModel from '../models/producto.model.js';

// Obtiene todos los productos, aplicando filtros opcionales (titulo, categoria, descripcion)
export async function getAllProducts(filters) {
  // Retorna la lista de productos del modelo según los filtros
  return await productoModel.obtenerTodos(filters);
}

// Obtiene un producto por su ID.
export async function getProductById(id) {
  // Retorna el producto correspondiente llamando al modelo
  return await productoModel.obtenerPorId(id);
}

// Crea un producto con los datos proporcionados.
export async function createProduct(data) {
  // Llama al modelo para insertar el nuevo producto y retorna el resultado
  return await productoModel.crear(data);
}

// Elimina un producto por su ID.
export async function deleteProduct(id) {
  // Llama al modelo para borrar el producto y retorna el resultado
  return await productoModel.eliminar(id);
}


