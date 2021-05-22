const { response } = require('express');
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
    
    if (req.query.person) {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
        res.send({quotes: quotesByPerson});
    } else {
        res.send({quotes: quotes})
    }
});

// Post new quotes

app.post('/api/quotes', (req, res, next) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;
    if (newQuote && newPerson) {
        quotes.push({ quote: newQuote, person: newPerson })
        res.send({ quotes: newQuote, person: newPerson })
       // res.redirect('/api/quotes');
    } else { 
        res.status(400).send()
    }
});

app.listen(PORT, ()=> {
    console.log(`Server is listening on port: ${PORT}`);
});