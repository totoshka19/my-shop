const express = require('express');
const cors = require('cors');
const { PRODUCTS } = require('../data/products');

// Создаем Express приложение, но не запускаем его через app.listen()
const app = express();

// Настраиваем CORS для разрешения запросов с фронтенда
app.use(cors({
  origin: 'http://localhost:5173', // URL вашего фронтенда
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/api/products', (req, res) => {
  // В реальном приложении здесь была бы логика получения данных из базы
  res.json(PRODUCTS); // Отправляем массив товаров в формате JSON
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Vercel ожидает экспортированную функцию-обработчик
module.exports = app;
