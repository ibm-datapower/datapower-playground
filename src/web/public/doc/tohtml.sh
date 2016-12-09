#!/usr/bin/env node

var md = require ('marked'),
    fs = require ('fs');

var toc = JSON.parse (fs.readFileSync('toc.json')),
    result = '';

toc.forEach (function (item) {
  var file = 'api/'+item+'.markdown';
  if (fs.existsSync (file)) {
     result += md (fs.readFileSync (file, {encoding: 'ascii'}));
  }
});

console.log (result);

