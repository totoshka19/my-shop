const app = require('./api'); // Импортируем Express приложение из api/index.js
const port = process.env.PORT || 3001; // Используем порт 3001 по умолчанию

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
}); 