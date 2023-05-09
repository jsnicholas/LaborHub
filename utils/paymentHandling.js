const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.paypalClient,
  'client_secret': process.env.paypalSecret
});