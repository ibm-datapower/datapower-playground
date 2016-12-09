/*--DESCRIPTION--
  <h4>Sample 9: Using Processing Policy Contexts</h4>
  <p>
    Shows how to use Processing Policy Contexts to share information between Processing Policy Actions and the network. We have already seen use of "session.input" and "session.output", where "input" and "output" refer to the local input and output Processing Policy Contexts. Uppercase "INPUT" refers to the INPUT context which is typically the original payload consumed by the first action in a policy.
  </p>
  <p>
    In this sample we are going to focus on the "session.name([string name])" API and using context variables. Context variables store type information and provide a synchronous API, where as the context data read API (readAsXYZ) is asynchronous and the API tells the system how to parse/resolve the information. Named contexts are available for the life-time of the transaction and we will demonstrate sharing information between two GatewayScript actions executing on the request and response path for the same transaction. (We use header "X-GS-Fiddle-Rule": "both", to execute the same script on both the request and response)
  </p>
  <p>
    Notice:
    <ol>
      <li>Notice we can distinguish between request and response execution using service metadata
      <li>Log data should indicate [request] vs [response]
      <li>Data read API is asynchronous because raw data can be stored unparsed and later parsed on the read
      <li>Share structured information between Actions is easy with the context variable API
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
 "X-GS-Fiddle-Rule": "both",
 "X-GS-Fiddle-Service": "mpgw",
 "X-GS-Fiddle-Request-URI": "/echo",
 "X-GS-Fiddle-Backside": "http://datapower-playground.mybluemix.net"
}
*/

console.info("Starting Context Demo");

// Include the service metadata module, to determine the type
// of the processing policy rule, either request or response
var sm = require('service-metadata');

// If the named context does not exist, create it
var ctx = session.name('myctx') || session.createContext('myctx');

// Execute this block when the action is executing on the request rule 
if (sm.transactionRuleType === 'request') {

    // write some JSON data using the data API
    ctx.write({ 'data': 'api' });

    // create a named variable with some JSON data
    ctx.setVar('myvar', { 'variable': 'api' });
}

// Execute this block when the action is executing on the response rule 
if (sm.transactionRuleType === 'response') {

    // read the named context JSON payload
    ctx.readAsJSON (function (err, json) {

        if (err) throw err;

        console.info (json);

        // This statement executes last
        console.info("Context Demo Complete");
    });

    // read the named context variable data
    console.info (ctx.getVar('myvar'));
}
