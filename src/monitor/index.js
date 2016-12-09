var request = require('supertest')('http://web:6001');
var email   = require("emailjs");

var server = undefined;
if (process.env.MONITOR_EMAIL_SERVER_USER) {
  server  = email.server.connect({
    user:     process.env.MONITOR_EMAIL_SERVER_USER,
    password: process.env.MONITOR_EMAIL_SERVER_PASSWORD,
    host:     process.env.MONITOR_EMAIL_SERVER_HOST,
    ssl:      true
  });
}

function sendEmail (text) {
  if (server) {
    server.send({
      text:    text,
      from:    "DataPower Playground <datapower-playground@noreply.com",
      to:      "Tony <t0ffrench@gmail.com>",
      subject: text
    }, function(err, message) { if (err) console.error (err); });
  } else {
    console.log (text);
  }
};

var headers = {
 "Content-Type": "application/json",
 "X-GS-Fiddle-Method": "POST",
 "X-GS-Fiddle-Rule": "request",
 "X-GS-Fiddle-Service": "mpgw",
 "X-GS-Fiddle-Request-URI": "/echo",
 "X-GS-Fiddle-Backside": "http://datapower-playground.mybluemix.net"
};

var success = false;

var timer = setInterval (function () {
  request.post('/input_and_script')
    .field('script', 'session.output.write("helloworld");')
    .field('headers', JSON.stringify (headers))
    .field('request', '')
    .expect(200, 'helloworld')
    .end(function(err, res) {
      if (!err && !success) {
        success = true;
        sendEmail ('datapower-playground: service available');
      }
      if (err && success) {
        success = false;
        sendEmail ('datapower-playground: service down');
      }
    });
}, 10000);
