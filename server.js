require('dotenv').config();
const https = require('https');
const fs = require('fs');
const express = require('express');
const sequelize = require('./models/index');
const Product = require('./models/product');
const User = require('./models/user');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const portHttps = 443; 
const portHttp = 80; 
const secretKey = 'Sc1023';


const sslOptions = {
    key: fs.readFileSync('./certs/private.key'), 
    cert: fs.readFileSync('./certs/certificate.crt'), 
};

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de CSRF
const csrfProtection = csurf({ cookie: true });
app.use((req, res, next) => {
    if (['/registro', '/login'].includes(req.path)) {
        return next();
    }
    csrfProtection(req, res, next);
});

// Ruta para obtener el token CSRF
app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Rutas principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/productos', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

// Crear servidor HTTPS
https.createServer(sslOptions, app).listen(portHttps, () => {
    console.log(`Servidor HTTPS escuchando en https://localhost:${portHttps}`);
});

// Redirigir tráfico HTTP a HTTPS
const http = require('http');
http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(portHttp, () => {
    console.log(`Servidor HTTP redirigiendo a HTTPS en el puerto ${portHttp}`);
});