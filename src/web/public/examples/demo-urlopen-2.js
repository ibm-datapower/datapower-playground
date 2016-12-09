/*--DESCRIPTION--
  <h4>Sample 7: URL Open Part 2</h4>
  <p>
    Shows how to use the urlopen API read a local file stored on the encrypted flash filestore
  </p>
  <p>
    Notice:
    <ol>
      <li>Performs a read from a file on the local flash filestore
      <li>Transmits the received JSON file as the new request payload
      <li>Modify the local file name URL and see the expected 404 response
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
var url = require('urlopen');

// Read and parse a file from the local flash filestore
url.open('local:///myfile.json', function(err, resp) {
    if (err) throw err;

    // Status code, 404 if File Not Found
    console.info(resp.statusCode + ' ' + resp.reasonPhrase);

    // Read the file data and parse into a JSON object
    resp.readAsJSON(function(err, json) {
        if (err) throw err;

        // Update the transactional payload to that just fetched
        session.output.write(json);
        console.info("Urlopen Demo Complete");
    });
});

console.info("Urlopen Demo Continuing...");
