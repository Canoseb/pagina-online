const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'Sc1023';

// Middleware de autenticación
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Ruta protegida
router.post('/carrito', authenticate, (req, res) => {
  // Lógica para agregar productos al carrito
  res.status(200).json({ message: 'Producto agregado al carrito' });
});

module.exports = router;