// index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Rutas publicas
// Login
app.use('/auth/login', authRoutes);

// Prueba de funcionamiento de api
app.get('/', (req, res) =>
  res.json({ message: 'API TP-Final-JR Funcionando 👍' })
);

// el Router decide que ruta es publica y cual es privada
app.use('/api/products', productsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor iniciado en puerto ${PORT}`)
);
