import { generateToken } from '../src/token-generator.js';

//  Array de usuarios default
const default_users = [
  { id: "1", email: "useremail.com",    password: "stronPass123" },
  { id: "2", email: "otro@usuario.com", password: "otraPass456" }
];

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validamos que lleguen ambos campos
    if (!email || !password) {
      return res.status(400).json({ error: 'Campos incorrectos' });
    }

    // Buscamos en el array un usuario que coincida email y password
    const user = default_users.find(u =>
      u.email === email && u.password === password
    );

    // Si no lo encontramos, 401
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generamos el JWT
    const token = generateToken({ id: user.id, email: user.email });

    //  Enviamos la respuesta al cliente
    res.json({ token: `Bearer ${token}` });

  } catch (err) {
    next(err);
  }
}
