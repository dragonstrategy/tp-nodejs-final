
// routes/auth.routes.js
import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';

const router = Router();

// POST /auth/login - comprueba credenciales y devuelve un JWT
router.post('/', login);

export default router;

