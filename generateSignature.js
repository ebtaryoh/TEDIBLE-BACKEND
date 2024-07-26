const crypto = require('crypto');

const secret = 'your_secret_key'; // Replace with your actual Paystack secret key
const payload = JSON.stringify({
  "event": "charge.success",
  "data": {
    "id": 123456789,
    "domain": "test",
    "status": "success",
    "reference": "r1f2e3r4e5n6c7e8",
    "amount": 500000,
    "message": null,
    "gateway_response": "Successful",
    "paid_at": "2023-07-26T12:34:56.000Z",
    "created_at": "2023-07-26T12:00:00.000Z",
    "channel": "card",
    "currency": "NGN",
    "ip_address": "127.0.0.1",
    "metadata": {
      "userId": "60d5f8efb60f5b6f22b3b4c1"
    },
    "log": {
      "time_spent": 12,
      "attempts": 1,
      "errors": 0,
      "success": true,
      "mobile": false,
      "input": [],
      "history": [
        {
          "type": "action",
          "message": "Attempted to pay",
          "time": 11
        },
        {
          "type": "success",
          "message": "Payment successful",
          "time": 12
        }
      ]
    },
    "authorization": {
      "authorization_code": "AUTH_8dfhjjdt",
      "bin": "539983",
      "last4": "8381",
      "exp_month": "08",
      "exp_year": "2023",
      "channel": "card",
      "card_type": "mastercard DEBIT",
      "bank": "Guaranty Trust Bank",
      "country_code": "NG",
      "brand": "mastercard",
      "reusable": true,
      "signature": "SIG_yJUJljd8qlue9l3yEH4k"
    },
    "customer": {
      "id": 123456,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "customer_code": "CUS_xnxdt6s1zg1f4nx",
      "phone": "",
      "metadata": {}
    },
    "plan": {},
    "requested_amount": 500000
  }
});

const hash = crypto.createHmac('sha512', secret).update(payload).digest('hex');
console.log(hash);
