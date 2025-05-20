const express = require('express');
const cors = require('cors');
const { PRODUCTS } = require('../data/products');

// Создаем Express приложение, но не запускаем его через app.listen()
const app = express();

app.use(cors()); // Включаем CORS

app.get('/api/products', (req, res) => {
  // В реальном приложении здесь была бы логика получения данных из базы
  res.json(PRODUCTS); // Отправляем массив товаров в формате JSON
});

// Vercel ожидает экспортированную функцию-обработчик
module.exports = app;
