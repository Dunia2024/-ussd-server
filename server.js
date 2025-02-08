const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Serve frontend files

// Serve index.html on root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle USSD requests
app.post('/ussd', (req, res) => {
    let { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response = '';

    if (text === '') {
        response = `CON Welcome to D-Pesa
1. Send Money
2. Check Balance
3. Withdraw Cash
4. Buy Airtime`;
    } else if (text === '1') {
        response = `CON Enter recipient phone number`;
    } else if (text.startsWith('1*07')) {
        response = `CON Enter amount to send`;
    } else if (text.startsWith('1*07*')) {
        response = `CON Enter your PIN`;
    } else {
        response = `END Transaction successful!`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
