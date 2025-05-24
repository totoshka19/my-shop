const express = require('express');
const cors = require('cors');
const { PRODUCTS } = require('../data/products');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.get('/api/products', (req, res) => {
  res.json(PRODUCTS);
});

app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

module.exports = app;
