/*--DESCRIPTION--
  <h4>Sample 1: Hello GatewayScript</h4>
  <p>
    This simple sample will help you get familiar with the environment
    and log the customary "Hello World" with a twist to both the DataPower
    system log and write the same message string as transactional data.
  </p>
  <p>
    Things to notice after you send the request via the Request tab:
    <ol>
      <li>System log message will contain "Hello GatawayScript!!" at info level
      <li>Response data sent back to this web application will contain the string "Hello GatewayScript!!"
      <li>Request tab in this sample will not contain any data since the request is a GET request
    </ol>
  </p>
  <p>
    The <b>console</b> API is mechanism for logging custom entries for reporting, auditing or serviceability purposes to the DataPower system log, which using Log Target configuration allows for very simple on box logging to complex multi-target off-box logging using different protocols. The <b>session</b> object refers to the transaction (request/response) as it flows through the DataPower Processing Policy. Take a look at the API reference now to get a better understanding for both the console and session API before continuing.
  </p>
*/

/*--INPUT--
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

// Log to the DataPower logging system the following message
console.info("Hello GatewayScript!!");

// Write the same message as transactional data
session.output.write("Hello GatewayScript!!");
