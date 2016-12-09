/*--DESCRIPTION--
  <h4>Sample 5: Working with Service Variables (service-metadata)</h4>
  <p>
    Shows how to read and write service metadata (DataPower
    Service Variables).  This capability is very consistent with
    the DataPower capabilities for getting and setting service
    variables with a stylesheet transform.
  </p>
  <p>
    Service variables provide access to underlying DataPower
    information.  Service variables can be used in one of two
    forms.  The preferred and easiest form is the dotted notation.
    Here, you simply substitute the url path name '/' characters
    with a '.' (period), and replace a hyphenated name with lower
    camel case.  For example, to access the service variable:
    var://service/mpgw/skip-backside, you substitute 
    sm.mpgw.skipBackside = true.
  </p>
  <p>
    The other way of accessing the variable is through using
    the full URL to the service variable.  For example, the
    same skip-backside variable above can be read by:
    sm.setVar('var://service/mpgw/skip-backside', true);
  </P>
  <p>
    Notice: 
    <ol>
      <li>Demonstrates access to service variables through dotted notation
      <li>Demonstrates access to service variables through URL notation
      <li>Returns list of service variables. Also, see the DataPower Online Information Center
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

console.info("Starting Service Metadata Demo");

// To access the service variables, you must include the
// module via the require() method.
var sm = require('service-metadata');

// Make the MPGW act as a loopback through the dotted notation
sm.mpgw.skipBackside = true;

// Set the service variables using the URL notation
sm.setVar('var://service/mpgw/skip-backside', true);

// Read the protocol method as a string using dotted notation
console.info("The received HTTP Method is: %s", sm.protocolMethod);

// Read the protocol method as a string using the URL notation
var method = sm.getVar('var://service/protocol-method');

// Read the entire list of variables using the list() method
var list = sm.list();

// Return the list of service variables available
session.output.write({
    method: method,
    allServiceVariables: list
});

console.info("Service Metadata Demo Complete");
