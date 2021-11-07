// server.js
const express = require('express');
const path = require('path');

// Define Express App
const app = express();
const PORT = process.env.PORT || 8888;

app.use(express.static('public'));
app.use(express.static('images'));
app.use('/static', express.static('public'))
app.use(express.static('views'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/reserve', (req, res) => {
  res.render('reserve');
});

// Serve Static Assets
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});