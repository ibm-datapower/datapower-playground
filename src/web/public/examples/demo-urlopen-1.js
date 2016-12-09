/*--DESCRIPTION--
  <h4>Sample 6: URL Open Part 1</h4>
  <p>
    Shows how to use the urlopen API to make a simple HTTP GET request
  </p>
  <p>
    The urlopen calls are asynchronous and the callback is invoked on success or error. The options object controls the specifics of the request, for example GET vs POST. Note when the response callback is fired only the HTTP headers are read off the network at this time. To read the response body use one of { resp.readAsJSON, resp.readAsBuffer, resp.readAsBuffers }. See the API reference for more information.
  </p>
  <p>
    Notice:
    <ol>
      <li>Retrieves a JSON file from an external web server
      <li>Transmits the received JSON file as the new request payload
    </ol>
  <p>
  <p>
    Homework:
    <br>
    Using the API Reference change this example from a GET to a POST. Use http://datapower-playground.mybluemix.net/echo as the target URL which will echo back the data and preserve the Content-Type.
  </p>

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
var url = require('urlopen');

// URL open defaults to GET request when the options object (first
// argument) is a simple URL.
url.open('http://datapower-playground.mybluemix.net/e1.json', function(err, resp) {
    if (err) throw err;

    // Only the HTTP headers have been read off the network at this point
    console.info(resp.headers);

    // Read the response data and parse into a JSON object
    resp.readAsJSON(function(err, json) {
        if (err) throw err;

        // Update the transactional payload to that just fetched
        session.output.write(json);
        console.info("Urlopen Demo Complete");
    });
});

console.info("Urlopen Demo Continuing...");
