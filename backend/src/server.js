const express = require('express');

const app = express();

app.post('/', (req, res) => {
  // Salvar no banco de dados por

  return res.status(201).send();
});

app.get('/search', (req, res) => {
  // buscar registros

  return res.json([]);
});

app.get('/suggest', (req, res) => {
  // buscar registros

  return res.json([]);
});

app.listen(3333, () => {
  console.log('Servidor ligado na porta 3333');
})