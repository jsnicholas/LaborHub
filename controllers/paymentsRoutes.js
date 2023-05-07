const router = require('express').Router();
const { User, Employee, PayHist } = require('../models');
const paypal = require('paypal-rest-sdk');

// render the payments page
router.get('/', (req, res) => {
    res.render('payments');
})
// if the payment successfully went through, render success page
router.get('/success', (req, res) => {
    res.render('payments', { message: "Payment Successful." })
})
// if the payment failed, render failure
router.get('/failure', (req, res) => {
    res.render('payments', { error: "Payment Failed." })
})
// make a post request with union dues data to paypal
router.post("/", (req, res) => {
    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: "http://127.0.0.1:3001/pay/success",
            cancel_url: "http://127.0.0.1:3001/pay/failure",
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            // details for union dues item
                            // this is what will show up on paypal receipt
                            name: "Union Dues - One Month",
                            sku: "001",
                            price: "25.00",
                            currency: "USD",
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: "USD",
                    total: "25.00",
                },
                description: "Membership Dues for One Month",
            },
        ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});


module.exports = router;