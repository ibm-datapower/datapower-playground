/*--DESCRIPTION--
  <h4>Exercise 3: Using the GatewayScript CLI Debugger</h4>
  <p>
    In this exercise we will demonstrate how to invoke the CLI debugger. The debugger must first be enabled on the action object that references the specific gateway script you want to debug and secondly you must have a "debugger;" statement in your code. The "debugger;" statement serves as the initial breakpoint. To speed things along we have already enabled the debugger.
  </P>
  <p>
    When you execute the script below, the transaction will pause. Follow this sequence of commands to interact with the debugger.
    <ol>
       <li> Launch a new terminal screen (shortcut is available on the left menu-bar) and `ssh 2459-gatewayscript-datapower`
       <li> Username: admin  Password: web1sphere
       <li> `switch fiddle` Switch to the fiddle application domain
       <li> `config` Enter global configuration mode
       <li> `show debug` List available debug sessions
       <li> `debug &lt;session number&gt;` Attach to a debug session. Type `help` in the debugger for more information
       <li> Use `continue` to continue to the next breakpoint or to allow the transaction to complete
    </ol>
  </p>
  <p>
    Notice:
    <ol>
      <li>Debug is enabled for this action.
      <li>Must go into debugger: show debug; debug &lt;sessionId&gt;
      <li>Try: list, print, next, step, continue
      <li>Message returned - Debugger - Successful Completion
      <li>Use the debugger keyword with any of the exercises in this lab
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
 "X-GS-Fiddle-Backside": "http://ubuntu:3080",
 "X-GS-Fiddle-Debug": true
}
*/

console.info("Starting Debugger Exercise");

debugger; // Initial break point.  Only has an affect
          // if debugging is enabled on action or service.

var foo = function(loop) {
    var i=0;
    if (loop){
        for (i=0; i&lt;loop; i++){
            console.info("Iteration number: %d", i);
        }
    }
}

var jsonObj = {'loopCount': 3};

foo(jsonObj.loopCount);

console.info("Debugger Demo Complete");
session.output.write("Debugger - Successful Completion\n");
