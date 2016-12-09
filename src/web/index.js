var express = require ('express'),
    request = require ('request'),
    app = express();

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

var input_and_script = 'http://datapower:8080/fiddleExtract',
    grab_tx_logs     = 'http://datapower:8080/gs-grab-transaction-logs';

app.use (express.static(__dirname + '/public'));

app.get ('/input_and_script', function(req, res){
    request['get'](input_and_script).pipe(res);
});
app.put ('/input_and_script', function(req, res){
    req.pipe (request['put'](input_and_script)).pipe(res);
});
app.post ('/input_and_script', function(req, res){
    req.pipe (request['post'](input_and_script)).pipe(res);
});
app.delete ('/input_and_script', function(req, res){
    request['del'](input_and_script).pipe(res);
});

app.get ('/grab_tx_logs', function(req, res){
    var conn = request['get'](grab_tx_logs);
    conn.headers['my-dp-txid'] = req.get ('my-dp-txid');
    conn.pipe(res);
});

app.all ('/echo', function(req, res) {
    req.pipe(res);
});

app.listen (appEnv.port, '0.0.0.0', function () {
  console.log('datapowerjs fiddle listening on port', appEnv.port);
});

// Handle uncaught exceptions and continue running
process.on('uncaughtException', function (e) {
    console.error (e.stack);
});
