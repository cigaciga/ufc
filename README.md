# UFC - eCommerce

Simple client for TBC Banks eCommerce payments

## Installation

The easiest way to install UFC Client is from [`npm`](https://www.npmjs.com/):

```sh
npm install ufc-ecommerce
```

## Usage in Node.js

`import {Ufc} from "ufc-ecommerce"` in your code.

```javascript
let config = {
  //Path to the PFX Cert file provided by UFC in .p12 format
  certFile: "./public/cert.p12",
  //Passphrase to cert file provided by UFC
  passphrase: "saewewqwq",
  //Payment page Language
  language: "GE",
  //Transaction currency code ISO code format
  currency: "981",
  //Transaction description code ISO code format
  description: config.description,
  //Proxy URL if needed
  proxyURL: "",
};

let ufcClient = new UFC(config);
//Async function to register transaction in UFC
//amount in tetri
//returns transaction id
let transId = await ufcClient.registerTransaction({
  amount: "100",
  clientIP: "127.0.0.1",
});

//Async function to get transaction status in UFC
/*returns transaction status object with status code, trans satatus, transaction description as object
statusCode: "000",
success: true,
transData: obj,
*/
let transStatus = await ufcClient.getTransactionStatus(transId);

//Async function to refund transaction in UFC
/*returns transaction status object with status code, trans satatus, transaction description as object
statusCode: "000",
success: true,
transData: obj,
*/
let transStatus = await ufcClient.refundTransaction(transId, amount);

```

