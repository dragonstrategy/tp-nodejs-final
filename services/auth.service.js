// services/auth.service.js
import jwt from 'jsonwebtoken';

export async function validateUser({ email, password }) {
  // Lógica real con Firebase Auth; de momento stub:
  if (email === 'admin@tienda.com' && password === 'admin123') {
    return { id: 'user-id-123', email };
  }
  return null;
}

export function generateToken(user) {
  const payload = { sub: user.id, email: user.email };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '2h' };
  return jwt.sign(payload, secret, options);
}
