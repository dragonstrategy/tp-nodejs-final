// controllers/auth.controller.js
import * as authService from '../services/auth.service.js';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan credenciales' });
    }

    const user = await authService.validateUser({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = authService.generateToken(user);
    res.json({ token: `Bearer ${token}` });
  } catch (err) {
    next(err);
  }
}
