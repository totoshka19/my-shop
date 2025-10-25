const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client'); // <-- Импортируем Prisma

// Создаем экземпляр Prisma Client
const prisma = new PrismaClient();
const app = express();

// Настраиваем CORS. Можно оставить как есть для локальной разработки.
app.use(cors()); // Для Vercel можно сделать более простым
app.use(express.json());

// Эндпоинт для получения ВСЕХ товаров из базы данных
app.get('/api/products', async (req, res) => {
  try {
    // Используем Prisma для запроса всех записей из таблицы Product
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Эндпоинт для получения ОДНОГО товара по ID из базы данных
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Используем Prisma для поиска уникальной записи по ID
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(`Failed to fetch product with id ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

/*
  Здесь в будущем вы можете добавить новые эндпоинты,
  например, для создания заказа, добавления товара и т.д.

  // Пример эндпоинта для создания товара (для тестирования)
  app.post('/api/products', async (req, res) => {
    try {
      const { name, description, price, imageUrl } = req.body;
      const newProduct = await prisma.product.create({
        data: { name, description, price, imageUrl },
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Failed to create product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  });
*/

// Vercel ожидает экспортированную функцию-обработчик
module.exports = app;
