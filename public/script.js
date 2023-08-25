document.getElementById('converter-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const sourceCurrency = document.getElementById('sourceCurrency').value;
    const targetCurrency = document.getElementById('targetCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const response = await fetch(`/convert?sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}&amount=${amount}`);
    const data = await response.json();
    console.log(typeof(response));
    document.getElementById('result').innerText = `Converted Amount: ${data.convertedAmount.toFixed(2)} ${targetCurrency}`;
});
