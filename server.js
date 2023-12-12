const express = require('express');
const moment = require('moment');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const connectDB = require('./db/connectDB.JS');
const PaymantModel = require('./models/payment');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

app.get('/', (req, res) => {
  res.send('<h1>Testing</h1>');
});
app.get('/token', (req, res) => {
     generateToken();
});
//middlewere to generate token

connectDB();

const generateToken = async (req, res, next) => {
  let consumer = process.env.MPESA_CONSUMER_KEY;
  let secret = process.env.MPESA_CONSUMER_SECRET;
  const auth = new Buffer.from(`${consumer}:${secret}`).toString('base64');
  await axios
    .get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data.access_token)
      token = response.data.access_token;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
};
//end

app.post('/stk', generateToken, async (req, res) => {
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;

  var timestamp = moment().format('YYYYMMDDHHmmss');

  const shortCode = process.env.MPESA_PAYBILL;
  const passkey = process.env.MPESA_PASS_KEY;

  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    'base64'
  );

  await axios
    .post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: shortCode,
        PhoneNumber: `254${phone}`,
        CallBackURL: 'https://0f86-102-23-139-170.ngrok-free.app/callback',
        AccountReference: `254${phone}`,
        TransactionDesc: 'test',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((data) => {
      console.log(data.data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json(err.message);
    });
});

app.post('/callback', (req, res) => {
  const callbackData = req.body; //getting from saf
  console.log(callbackData.Body);
  if (!callbackData.Body.stkCallback.CallbackMetadata) {
    console.log(callbackData.Body);
    return res.json('ok');
  }
  console.log(callbackData.Body.stkCallback.CallbackMetadata);

  const amount = callbackData.Body.stkCallback.CallbackMetadata.Item[0].Value;
  const phone = callbackData.Body.stkCallback.CallbackMetadata.Item[4].Value;
  const transaction_Id =
    callbackData.Body.stkCallback.CallbackMetadata.Item[1].Value;

  console.log(amount, transaction_Id, phone);

  const payment = new PaymantModel();

  payment.phone = phone;
  payment.amount = amount;
  payment.transaction_Id = transaction_Id;

  payment
    .save()
    .then((data) => {
      res.status(201).json(data)
      console.log(data);
    })
    .catch((error) => {
      res.status(500).json(error)
      console.log(error.message);
    });
});

app.get("/details", async(req, res) => {
  try {
    const transactionData = await PaymantModel.find()
    res.status(200).json({success: true, transactionData})
  } catch (error) {
    console.log(error)
  }
})