var paypal_api = require('paypal-rest-sdk');

var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'AavqyhAcMDd00m4Fb-3Jg8E8A1ALar2O-ErOAyTq5ofzi491REDkjQtCPAld',
    'client_secret': 'EPifGBCfSsAB7QNjCV8TpJjBjoKmUoWQx4qkk0xPzqbxL0FyMHaEc-ktYpMW'
};

paypal_api.configure(config_opts);

var create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {

                // http://localhost:3000/1/post/539eb886e8dbde4b39000007/paid?token=EC-4T17102178173001V&PayerID=QPPLBGBK5ZTVS
                return_url: 'https://localhost:3000/1/post/' + 'aaa' + '/paid',
                cancel_url: 'https://localhost:3000/1/post/' + 'aaa' + '/cancel'
            },
            transactions: [{
                amount: {
                    currency: 'TWD',
                    total: 99
                },
                description: '購買教學文章'
            }]
};

paypal_api.payment.create(create_payment_json, function (err, res) {
    if (err) {
        console.log(err);
    }

    if (res) {
        console.log("Create Payment Response");
        console.log(res);
    }
});