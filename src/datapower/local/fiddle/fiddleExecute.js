var hm = require ('header-metadata'),
    sm = require ('service-metadata'),
    fs = require ('fs');

//  Sample Headers
//
//  X-GS-Fiddle-Method: POST
//  X-GS-Fiddle-Rule: request
//  X-GS-Fiddle-Request-URI: /cgi-bin/echo.cgi
//  X-GS-Fiddle-Backside:  http://testserver1.dp.swg.usma.ibm.com
//  X-GS-Fiddle-Skip-Backside: false
//  X-GS-Fiddle-Script-Loc: temporary://tmp/temp_333


var mpgw_uri = hm.current.get('X-GS-Fiddle-Request-URI'),
    mpgw_rule = hm.current.get('X-GS-Fiddle-Rule'),
    mpgw_backside = hm.current.get('X-GS-Fiddle-Backside'),
    mpgw_script_loc = hm.current.get('X-GS-Fiddle-Script-Loc'),
    mpgw_skip_backside = hm.current.get('X-GS-Fiddle-Skip-Backside'),
    mpgw_gws_debug = hm.current.get('X-GS-Fiddle-Debug');

//
// Set the transaction ID in the response headers. This is used
// later to grab the relevant transaction logs. 
//
hm.response.set ('X-GS-Fiddle-DP-TXID', sm.transactionId);

//
// Skip backside or route to the target backend
//
if (mpgw_skip_backside === 'true') sm.mpgw.skipBackside = true;
else sm.routingUrl = mpgw_backside + mpgw_uri;

//
// Turn on transactional GatewayScript debugging
//
if (mpgw_gws_debug === 'true') sm.gatewayscript.debug = true;

//
// Create the Processing Policy content "fiddle" to pass the location
// of the script file written by the previous mpgw
//
var ctx = session.createContext ('fiddle');
ctx.setVar("script", mpgw_script_loc);
ctx.write('<'+mpgw_rule+'/>');

//
// Strip all the X-GS-Fiddle-* headers//
// Strip all the X-GS-Fiddle-* headers
//
var headers = hm.current.headers;
for (var header in headers) {
   if(header.match (/^X-GS-Fiddle/)) {
      hm.current.remove(header);
   }
}
