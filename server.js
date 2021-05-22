const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Get random quote
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send(randomQuote.quote);
});

// Get all quotes 
app.listen(PORT, ()=> {
    console.log(`Server is listening on port: ${PORT}`);
});