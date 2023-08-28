document.getElementById('converter-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const sourceCurrency = document.getElementById('sourceCurrency').value;
    const targetCurrency = document.getElementById('targetCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const response = await fetch(`/convert?sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}&amount=${amount}`);
    const data = await response.json();
    
    document.getElementById('result').innerText = `Converted Amount: ${data.convertedAmount.toFixed(2)} ${targetCurrency}`;
        
        const logData = {
            sourceCurrency,
            sourceAmount: amount,
            targetCurrency,
            convertedAmount: data.convertedAmount,
        };
    
        const logResponse = await fetch('/logConversion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logData),
        });
    
        if (logResponse.status === 201) {
            console.log('Conversion data logged successfully');
        } else {
            console.error('Failed to log conversion data');
        }
});

document.getElementById('fetch-history-button').addEventListener('click', async () => {
    const response = await fetch('/getHistory');
    const history = await response.json();

    const historyTable = document.getElementById('history-table');
    historyTable.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Source Currency</th>
            <th>Source Amount</th>
            <th>Target Currency</th>
            <th>Converted Amount</th>
        </tr>
    `;

    history.forEach(log => {
        const row = historyTable.insertRow();
        row.insertCell().innerText = log.date;
        row.insertCell().innerText = log.source_currency;
        row.insertCell().innerText = log.source_amount;
        row.insertCell().innerText = log.target_currency;
        row.insertCell().innerText = log.converted_amount;
    });
});



