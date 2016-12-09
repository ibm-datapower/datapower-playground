/*--DESCRIPTION--
  <h4>Sample 3: Reading and Writing a message payload</h4>
  <p>
    In this sample you'll learn how read the payload
    of a message received either as the request or response in
    a conversation between the client and server.
  </p>
  <p>
    In the following script, we read the 'input' context which
    holds the body of the request in our MultiProtocol Gateway.
    We first read it as a buffer (binary data), and then we read it as a
    JSON object.  Both reads are written to the System Log.
    The JSON object is then modified by conditionally adding
    a new property to it.  The resulting object is written
    to the 'output' context of the action. This becomes the
    body of the response that is returned to the client.
  </p>
  <p>
    Also, note that the readAsBuffer() and readAsJSON() are
    asynchronous function calls. The anonymous function in
    the body of these calls is called back when the read is
    complete. In the mean time, the flow continues, so in this
    case the write to the system log that states "not done yet..."
    executes before the read completes. The GatewayScript action
    will not conclude until all work in the script has finished.
  </P>
  <p>
    Notice: 
    <ol>
      <li>The input message contains a property f
      <li>Script selectively modifies the JSON object based on the boolean value of f
      <li>Modify the input boolean value of f to false and rerun
      <li>session.input.readAsJSON() reads the input context (input payload)
      <li>session.output.write() writes the output context (payload returned)
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

console.info("Starting Read/Write Payload Demo");

session.input.readAsBuffer(function (error, bufferObject) {
    // Asynchronous callback when request payload is received
    // If an error occurs, the error object will be populated.
    // A Buffer object holds binary data.
    if (error){
        console.error("readAsBuffer() failure: %s", error);
    }
    else {
        console.info("readAsBuffer() success: %s", bufferObject);
        session.input.readAsJSON(function (error, jsonObject) {
           // Asynchronous callback when request payload is received
           // The JSON object is parsed during the read.

           // If an error occurs, the error object will be populated.
           // Throw the error to the Processing Policy handling. If
           // an error rule is matched it will be executed. Also see
           // OnError action for more fine grained control.
           if (error) throw error;

           // Modify the JSON object
           if (jsonObject.f === true)
               jsonObject.comment = "Object has been modified";

           // Write the output to the 'output' context. This
           // is creating a new body in the flow
           session.output.write(jsonObject);

           console.info("readAsJSON success: %s", jsonObject);
           console.info("Read/Write Payload Demo Complete");     
        });
    }
});

console.info("Read/Write Payload Demo not done yet...");
