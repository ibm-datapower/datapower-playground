/*--DESCRIPTION--
  <h4>Sample 10: Ratelimit based on a simple count</h4>
  <p>
     The following APIs exist.
     <ul>
     <li> rl.count (key), rl.countCreate(key),
     <li> rl.rate (key), rl.rateCreate (key, tokens, interval),
     <li> rl.concurrent (key), rl.concurrentCreate (key)
     <li> rl.tokenbucket (key), rl.tokenbucketCreate (key, size, tokens, interval)
     </ul>

     All count based limites have the following API
     <ul>
     <li> add (number, function (err, count) {});
     <li> sub (number, function (err, count) {});
     <li> count (funciton (err, count) {}); // read-only
     <li> reset (function (err) {});
     </ul>

     All rate based limites have the following API
     <ul>
     <li> remove (number, function (err, remaining, reset) {});
     <li> remaining (funciton (err, remaining) {}); // read-only
     <li> reset (function (err) {});
     </ul>
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

console.info("Starting Rate Limit Demo");

var hm = require('header-metadata'),
    rl = require('ratelimit'),
    foo = rl.rateCreate ('foo', 2, 60);

foo.remove (1, function (err, remaining, reset) {

    hm.response.set ('X-Rate-Limit-Limit:', '2/minute');
    hm.response.set ('X-Rate-Limit-Remaining', remaining);
    hm.response.set ('X-Rate-Limit-Reset', reset);

    if (err) {
        hm.response.statusCode = "429 Too Many Requests";
        session.output.write('Rate Exceeded');
    }
});

