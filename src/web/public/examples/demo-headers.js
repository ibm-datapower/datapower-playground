/*--DESCRIPTION--
  <h4>Sample 4: Reading and Writing headers</h4>
  <p>
     Shows how to read the headers of a received request. In the following script, we read the original headers those that are received off the wire. And we read the current headers the current collection of headers after being modified by previous actions.
  </p>
  <p>
     The headers can be retrieved as a single object, or they can be retrieved individually.
  </p>
  <p>
     Finally, the statusCode and reasonPhrase are modified to return a 203 status code with a custom reason phrase. The 203 status code will be shown on the response tab, but the custom reason phrase will not as the browser rewrites/ignores the reason phrase and uses the recommended values presented in RFC 2616.
  </P>
  <p>
    Notice:
    <ol>
      <li>hm.original.headers is the collection as received off the wire
      <li>hm.current.headers is the current collection of headers in this action
      <li>hm.response.headers is used to populate headers when there is no backend, ie loopback service
      <li>Check the log messages for the various collections
      <li>Status code and reason phrase are set to '203 Overriding the reasonPhrase'
      <li>Note that since the input was not read, and the output was not written, the payload was automatically passed through.
     </ol>
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

console.info("Starting Read/Write Header Demo");

// Load the header-metadata API
var hm = require('header-metadata');

// Retrieve the current collection of headers. Original headers is
// read-only and will contain a number of X-GS-Fiddle-* headers used
// in the DataPower portion of this Web Application implementation.
console.info("Original Headers: %j", hm.original.headers);

// Retrieve the current collection of headers
console.info("Current headers: %j", hm.current.headers);

// read a specific header with case insensitive name
console.info("Content-Type is: " + hm.current.get("content-type"));

// Set single header. Sets X-new-header to a value of myHeaderValue.
hm.response.set('X-new-header', 'myHeaderValue');

// Retrieve the current collection of response headers.
// Note that these are merged with DataPower headers to
// ensure a valid HTTP response.
console.info("Response headers: %j", hm.response.headers);

hm.response.statusCode = "203 Overriding the reasonPhrase";

console.info("Read/Write Header Demo Complete");
