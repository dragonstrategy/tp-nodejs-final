// index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import productsRoutes from './routes/products.routes.js';
import authRoutes     from './routes/auth.routes.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Montar capa de rutas
app.use(authRoutes);
app.use(productsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Tienda Funcionando 👍' });
});

// Middleware para rutas no definidas (404)
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// (Opcional) Error handler para devolver siempre JSON
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Proyecto final de JR iniciado');
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
