const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Get random quote
app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote});
});

// Get all quotes 
app.get('/api/quotes', (req, res, next) => {
    const queryParms = req.query;

    if (queryParms.person) {
        const quotesByPerson = quotes.filter(quote => quote.person === queryParms.person);
        res.send({quotes: quotesByPerson});
    } else {
        res.send({quotes: quotes})
    }
});

app.listen(PORT, ()=> {
    console.log(`Server is listening on port: ${PORT}`);
});