var hm = require ('header-metadata'),
    sm = require ('service-metadata'),
    fs = require ('fs'),
    url = require ('urlopen');

//  Sample Headers
//
//  X-GS-Fiddle-Method: POST
//  X-GS-Fiddle-Rule: request
//  X-GS-Fiddle-Request-URI: /cgi-bin/echo.cgi
//  X-GS-Fiddle-Backside:  http://testserver1.dp.swg.usma.ibm.com
//  X-GS-Fiddle-Skip-Backside: false
//  X-GS-Fiddle-Script-Loc: temporary://tmp/temp_333

//
// Skip the Backside, request is sent using urlopen
//
sm.mpgw.skipBackside = true;

//
// Extract the boundary. In the next release of GatewayScript we will
// hopefully have a more native method for dealing with mulitpart messages
//
var boundary = undefined;
var ct = hm.current.get ('content-type');
if (ct) boundary = ct.substr(ct.indexOf('boundary=')+9);

session.input.readAsBuffer (function (err, buf) {
    if (err) throw err;

    var sbuffer = buf.toString();
    var parts = sbuffer.split ('--'+boundary);

    var data       = undefined,
        headers    = undefined,
        script_loc = undefined;

    for (var idx = 1; idx < parts.length-1; idx++) {

        var part   = parts[idx].trim(),
	    offset = part.indexOf('\r\n\r\n'),
	    header = part.substring (0, offset),
	    body   = part.substring (offset+4);

	if (/script/.test(header)) {
             script_loc = fs.temporary(),
             fs.writeFile (script_loc, body, function() {});
	}

        if (/headers/.test(header)) {
             headers = JSON.parse (body);
        }

	if (/request/.test(header)) {
             data = body;
	}
    }

    sendRequest (data, headers, script_loc);
});

//
// Send the request to the second MPGW. Using two MPGW to provide
// a cleaner and more realistic execution for the user provided script.
// For example: session.INPUT contains just the request data
//
function sendRequest (data, headers, script_loc) {

    var type   = headers['X-GS-Fiddle-Service'],
        uri    = headers['X-GS-Fiddle-Request-URI'],
        method = headers['X-GS-Fiddle-Method'],
        target = 'http://127.0.0.1:'+((type=='mpgw')?'8081':'8082')+uri;

    headers['X-GS-Fiddle-Script-Loc'] = script_loc;

    var options = {

        target:  target,
        method:  method,
        headers: headers,
        data:    data
    };

    console.info ("urlopen %s to %s",   options.method, options.target);
    console.info ("urlopen headers %s", JSON.stringify(options.headers));
    console.info ("urlopen data %s",    options.data);

    url.open (options, function (err, res) {
        fs.unlink (script_loc, function() {});
        if (err) throw err;

        console.info ("urlopen res status code %d", res.statusCode);
        console.info ("urlopen res headers %s", JSON.stringify(res.headers));

        hm.response.statusCode = res.statusCode;
        hm.response.headers = res.headers;

        res.readAsBuffer (function (err, buf) {
            if (err) throw err;

            console.info ("urlopen res data %s", buf);
            session.output.write (buf);
        });
    });
};
