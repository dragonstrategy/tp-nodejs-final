// models/producto.model.js
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

const productosCol = collection(db, 'productos');

// Devuelve todos los productos - aplicando filtros opcionales
export async function obtenerTodos({
  titulo,
  categoria,
  descripcion
} = {}) {
  try {
    //  Consulta a Firestore, traemos todos los documentos de la coleccion
    const snapshot = await getDocs(productosCol);

    //  Mapeamos a JS
    let productos = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    //  si se filtra por titulo, pasamos a minuscula y buscamos la palabra de forma parcial o total 
    if (titulo) {
      const busq = titulo.toLowerCase();
      productos = productos.filter(p =>
        p.titulo.toLowerCase().includes(busq)
      );
    }

    // si se filtra por descripcion, pasamos a minuscula y buscamos la palabra de forma parcial o total 
    if (descripcion) {
      const busq = descripcion.toLowerCase();
      productos = productos.filter(p =>
        p.descripcion.toLowerCase().includes(busq)
      );
    }

    // si se filtra por categoria, pasamos a minuscula y buscamos la palabra de forma parcial o total 
    if (categoria) {
      const busq = categoria.toLowerCase();
      productos = productos.filter(p =>
        p.categoria.toLowerCase().includes(busq)
      );
    }

    // Devolvemos el array resultante (podria llegar a quedar vacío)
    return productos;
  } catch (err) {
    console.error('Error al aplicar filtros:', err);
    throw err;
  }
}

// Devuelve un producto por su ID.
export async function obtenerPorId(id) {
  try {
    const ref = doc(db, 'productos', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error(`Error al obtener el producto con id: (${id}):`, err);
    throw err;
  }
}

// Crea un nuevo producto en nuestra base de firestore
export async function crear(data) {
  try {
    const docRef = await addDoc(productosCol, data);
    const snap = await getDoc(docRef);
    return { id: docRef.id, ...snap.data() };
  } catch (err) {
    console.error('Error al crear producto:', err);
    throw err;
  }
}

// Actualiza un producto por ID
// Devuelve el producto actualizado o null si no existe
export async function actualizar(id, data) {
  try {
    const ref = doc(db, 'productos', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return null;
    }
    // updateDoc sólo modifica los campos
    await updateDoc(ref, data);
    // Recupera el documento actualizado
    const updatedSnap = await getDoc(ref);
    return { id: updatedSnap.id, ...updatedSnap.data() };
  } catch (err) {
    console.error(`Error al actualizar el producto con: (${id}):`, err);
    throw err;
  }
}

// Elimina un producto por ID.
export async function eliminar(id) {
  try {
    const ref = doc(db, 'productos', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return false;
    await deleteDoc(ref);
    return true;
  } catch (err) {
    console.error(`Error al eliminar el producto con id: (${id}):`, err);
    throw err;
  }
}
