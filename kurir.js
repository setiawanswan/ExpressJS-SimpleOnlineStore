var qs = require("querystring");
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "api.rajaongkir.com",
  "port": null,
  "path": "/starter/cost",
  "headers": {
    "key": "8f43d3a5decdee78cb9e0382fafb5d35",
    "content-type": "application/x-www-form-urlencoded"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(qs.stringify({ origin: '501',
  destination: '114',
  weight: 1700,
  courier: 'jne' }));
req.end();