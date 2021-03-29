require('dotenv').config({ path: '.env' });
const express = require('express');
const app = express();
var cors = require('cors');
const Nexmo = require('nexmo');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const nexmo = new Nexmo({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
    applicationId: process.env.VONAGE_APPLICATION_ID,
    privateKey: process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH,
});

const from = process.env.FROM_NUMBER;
const to = process.env.TO_NUMBER;

app.use(cors());
app.options('*', cors());
app.post('/sendSms', function (req, res) {
    console.log(req.body);
    const reqBody = req.body;
    nexmo.message.sendSms(from, to, reqBody.text);
    res.send("SMS Enviado");
});

app.listen(process.env.SERVER_PORT);
