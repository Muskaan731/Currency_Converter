const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/convert', (req, res) => {
    const sourceCurrency = req.query.sourceCurrency;
    const targetCurrency = req.query.targetCurrency;
    const amount = parseFloat(req.query.amount);

    // Mock exchange rates (you can replace with actual rates)
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
