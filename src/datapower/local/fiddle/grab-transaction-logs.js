var hm = require ('header-metadata'),
    sm = require ('service-metadata'),
    cl = require ('console'),
    fs = require ('fs'),
    fs2 = require ('x-dp-native-fs');

// Determine the transaction ID
var date = new Date();
var tid = hm.current.get ('my-dp-txid');
if (!tid) tid = sm.transactionId;

// Parse the log files and concatenate the result
var result = '';
[
  'logtemp:///default-log',
  'logtemp:///default-log.1'
].forEach (function (file) {

  if (!fs2.operate(fs2.kEXISTS, file)) {
    console.log ('Log file=%s not found for tid=%s', file, tid);
    return;
  }

  var buff = fs2.operate(fs2.kREADASBUFFER, file);
  var logs = buff.toString('ascii'),
      lines = logs.split(/(?:\n|\r\n|\r)/g),
      stamp = "", found = false;
  
  console.log ('Log file=%s length=%d tid=%s', file, lines.length, tid);

  lines.forEach (function (line) {
    if (line.indexOf ('('+tid+')') !== -1) {
      found = true;
      stamp = line.slice (0, 11);
      result += line + '\n';
    }
    else if (found && line.slice (0, 11) !== stamp) {
      result += line + '\n';
    }
    else found = false;
  });
});

console.log ('Grab logs length(%s)', result.length)

// Write out the text/plain result
session.output.write (result);
