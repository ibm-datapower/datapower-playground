/*--DESCRIPTION--
  <h4>Sample 2: Logging to the DataPower logging system</h4>
  <p>
    Writing to the system log has never been easier. Simply pass an object to the console object using
    the method that describes the severity of the message. Whether the log message is logged and
    where this log message is logged to depends on the DataPower log target configuration. For example
    each of the log messages below could be transmitted by syslog to a centralized off-box log
    management solution.
  </P>
  <p>
    Notice:
    <ol>
      <li>System log messages - different priorities, syntax
      <li>Message returned - Console - Successful Completion
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

console.info("Starting Console Demo");

// Print a json variable directly to the log at info level
console.info({'myLabel' : 'myValue'});

// Print a number to the log at alert level using printf style formatting
// For more information on supported format specifiers, see sprint in the
// API Reference
var numberObject = 1234;
console.alert("The magic number is: %d", numberObject);

// Print a value using positional parameters (1$ receives first param
// 2$ receives second param).  Note that in the example the stringObject
// is %2$s since it is the second object after the format string.
var boolObject = true;
var stringObject = "This message was placed here by GatewayScript!";
console.emerg("%2$s It is %1$s!", boolObject, stringObject);

// The following log levels are provided
console.debug("debug");
console.info("info");
console.notice("notice");
console.warn("warn");
console.error("error");
console.critical("critical");
console.alert("alert");
console.emerg("emerg");
console.log("log/info");
console.trace("trace/debug");

// Advanced printf style formatting is supported
console.log ("%1$b %1$c %1$i %1$d %1$e %1$E %1$f %1$o %2$O %2$s %2$S %1$u %1$x %1$X %2$j", 1234, "abcd");

console.info("Console Demo Complete");
session.output.write("Console - Successful Completion");
