const express = require('express');
const { v4: uuid } = require('uuid');
const { Ingest, Search } = require('sonic-channel');

const app = express();
app.use(express.json())

const sonicChannelIngest = new Ingest({
  host: 'localhost',
  port: 1491,
  auth: 'SecretPassword',
});

const sonicChannelSearch = new Search({
  host: 'localhost',
  port: 1491,
  auth: 'SecretPassword',
});

sonicChannelIngest.connect({
  connected: () => {
    console.log('Connected Ingest');
  }
});

sonicChannelSearch.connect({
  connected: () => {
    console.log('Connected Search');
  }
});

app.post('/pages', async (req, res) => {
  const { title, content } = req.body;
  const id = uuid();

  // Cadastrar pagina no banco

  await sonicChannelIngest.push('pages', 'default', `page:${id}`, `${title} ${content}`, {
    lang: 'por'
  })

  return res.status(201).send();
});

app.get('/search', async (req, res) => {

  const { query } = req.query;

  const results = await sonicChannelSearch.query('pages', 'default', query, { lang: 'por' });
  
  return res.json(results);
});

app.get('/suggest', async (req, res) => {

  const { query } = req.query;

  const results = await sonicChannelSearch.suggest('pages', 'default', query, { limit: 5 }, { lang: 'por' });
  
  return res.json(results);
});

app.listen(3333, () => {
  console.log('Servidor ligado na porta 3333');
})