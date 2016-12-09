/*--DESCRIPTION--
  <h4>Sample 8: URL Open Part 3</h4>
  <p>
    Shows how to use the urlopen API to fetch from two remote endpoints simultaneously, combine the result and update the transactional payload.
  </p>
  <p>
    Notice:
    <ol>
      <li>Performs two requests for two different remote endpoints in parallel
      <li>Transmits the received JSON file as the new request payload
    </ol>
  <p>
*/

/*--INPUT--
{ "hello": "world", "f" : true }
*/

/*--HEADERS--
{
 "Content-Type": "application/json",
 "X-GS-Fiddle-Method": "POST",
 "X-GS-Fiddle-Rule": "request",
 "X-GS-Fiddle-Service": "mpgw",
 "X-GS-Fiddle-Request-URI": "/echo",
 "X-GS-Fiddle-Backside": "http://datapower-playground.mybluemix.net"
}
*/

console.info("Starting urlopen Demo");

// Include the urlopen module
var url = require('urlopen'),

    endpoints = [{ 'url': 'http://datapower-playground.mybluemix.net/e1.json' },
                 { 'url': 'http://datapower-playground.mybluemix.net/e2.json' }],

    count = endpoints.length;

// Loop over each endpoint target, initiating the request
endpoints.forEach(function (endpoint, index) {
    url.open(endpoint.url, function (err, resp) {
        if (err) throw err;

        resp.readAsJSON(function (err, json) {
            if (err) throw err;

            endpoints[index].data = json;
            if (--count === 0) done();
        });
    });
});

// Write the combined result to the local output process
// policy context
function done () {
    session.output.write (endpoints);
}

