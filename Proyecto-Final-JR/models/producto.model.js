// models/producto.model.js
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

// Referencia a la colección 'productos'
const productosCol = collection(db, 'productos');

/**
 * Devuelve todos los productos.
 * @returns {Promise<Array<{id:string, titulo:string, precio:number, categoria:string, descripcion:string}>>}
 */
export async function obtenerTodos() {
  const snapshot = await getDocs(productosCol);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

/**
 * Devuelve un producto por su ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function obtenerPorId(id) {
  const ref = doc(db, 'productos', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Crea un nuevo producto en Firestore.
 * @param {{titulo:string, precio:number, categoria:string, descripcion:string}} data
 * @returns {Promise<Object>}
 */
export async function crear(data) {
  const docRef = await addDoc(productosCol, data);
  const snap = await getDoc(docRef);
  return { id: docRef.id, ...snap.data() };
}

/**
 * Elimina un producto por ID.
 * @param {string} id
 * @returns {Promise<boolean>} true si existía y se borró
 */
export async function eliminar(id) {
  const ref = doc(db, 'productos', id);

  // 1) Comprueba si existe
  const snap = await getDoc(ref);
  console.log('DEBUG eliminar, existe?', snap.exists(), 'para ID:', id);

  if (!snap.exists()) {
    return false;
  }

  // 2) Si existe, bórralo
  await deleteDoc(ref);
  return true;
}
