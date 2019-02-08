let axios = require('axios')

let merchantCode = 'D4355';
let merchantKey = 'b6924822efdd372a2600284c39a52649';
let paymentAmount = '20000';
let paymentMethod = 'A1';
let merchantOrderId = 7;
let productDetails = 'Test Pay with Duitku';
let email = 'wan@gmail.com';
let phoneNumber = '085365653941';
let itemDetails = [
    {'name' : 'duit',
    'price': 10000,
    'quantity': 1,},

    {'name' : 'duit',
    'price': 10000,
    'quantity': 1,}
]
let callbackUrl = '';
let returnUrl = '';

let md5 = require('blueimp-md5')
let signature = md5(merchantCode + merchantOrderId + paymentAmount + merchantKey)


let urlSBDuitku = 'http://sandbox.duitku.com/webapi/api/merchant/inquiry';

let params = {
    'merchantCode': merchantCode,
    'merchantKey': merchantKey,
    'paymentAmount': paymentAmount,
    'paymentMethod': paymentMethod,
    'merchantOrderId': merchantOrderId,
    'productDetails': productDetails,
    'email': email,
    'phoneNumber': phoneNumber,
    'itemDetails': itemDetails,
    'callbackUrl': callbackUrl,
    'returnUrl': returnUrl,
    'signature': signature
}
let params_string = JSON.stringify(params).length
 axios({
    method: 'POST',
    url: urlSBDuitku,
    data: params,
    header: {
        'Content-Type': 'application/json',                                                                                
        'Content-Length': params_string
    }
})
.then(x => {
    console.log(x.data)
    // window.location(x.paymentUrl)
})
.catch(error => {
    console.log(error)
})
// console.log(response)


