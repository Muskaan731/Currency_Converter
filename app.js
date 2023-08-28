const express = require('express');
const app = express();
const PORT = 3000;

const { Pool } = require('pg'); // Import the pg library

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'currency_conversion',
    password: '@07032001m.',
    port: 5432,
});

app.use(express.static('public'));

app.use(express.json()); // Add this line to parse JSON requests

app.get('/convert', (req, res) => {
    const sourceCurrency = req.query.sourceCurrency;
    const targetCurrency = req.query.targetCurrency;
    const amount = parseFloat(req.query.amount);
    const exchangeRates = {
        INR: {
            USD: 0.014,
        },
        USD: {
            INR: 71.50,
        },
    };

    const convertedAmount = amount * exchangeRates[sourceCurrency][targetCurrency];
    res.send({ convertedAmount });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.post('/logConversion', async (req, res) => {
    const { sourceCurrency, sourceAmount, targetCurrency, convertedAmount } = req.body;
    
    const query = `
        INSERT INTO conversion_logs (source_currency, source_amount, target_currency, converted_amount)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `;

    try {
        const result = await pool.query(query, [sourceCurrency, sourceAmount, targetCurrency, convertedAmount]);
        res.status(201).send({ id: result.rows[0].id });
    } catch (error) {
        console.error('Error logging conversion:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/getHistory', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM conversion_logs ORDER BY date DESC');
        res.send(result.rows);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).send('Internal server error');
    }
});

