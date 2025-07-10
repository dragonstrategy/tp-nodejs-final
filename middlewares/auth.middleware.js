// middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.JWT_SECRET;

export function authenticateJWT (req, res, next) {
  // Leemos el header Authorization
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token faltante' });
  }
  
  // Debe venir en formato "Bearer token"
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(400).json({ error: 'Formato de token inválido' });
  }

  // Verificamos el token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }

    // Si esta odo OK, pasamos al siguiente handler
    next();
  });
}
