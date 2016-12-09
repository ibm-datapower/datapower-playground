# Header-metadata

Use header-metadata to access the headers of an incoming request or response, you
can access it with `require('header-metadata')`. The headers module is broken
down into three sub-modules: original, current, and response.

* `original` - represents the original collection of headers received off the
  wire. For a request rule, these are the headers received in the request from
  the client. For a response rule, these are the headers received in the
  response from the back-end host. Original headers are read only.

* `current` - represents the current state of the headers as they are being
  passed from action to action along a processing rule. The processing rule may
  be either a request rule or a response rule. Current headers are read/write.

* `response` - represents the header collection that is used for a response that
  is being created in the request rule. This is used for a loopback firewall or
  when skip-backside is used in a multiprotocol gateway. Response headers are
  read/write.

Exampes:

    var hm = require('header-metadata');

    // Get single header value. Read the content-type header (case insensitive).
    // Note that if there are multiple headers with the same name (e.g. 
    // set-cookie), then only the first header is returned as a string
    var contentType = hm.current.get('content-type');

    // Retrieve a json object with all headers
    var allHeaders = hm.current.get();

    // Retrieve a json object with all headers in another form
    var allHeaders = hm.current.headers;

    // Set single header. Sets X-new-header to a value of new-header.
    hm.current.set('X-new-header', 'new-header');

     // Allows for set-cookie on multiple lines
    hm.current.set('set-cookie', ['value1', 'value2']);

    // write the status code with a number. Standard reasonPhrase is set to
    // the corresponding value (in this case, .OK.).
    hm.current.statusCode = "200";
    hm.current.statusCode = 200;

    // specify status code with a string containing the statusCode and 
    // reasonPhrase separated by a single space.
    hm.current.statusCode = "200 Super-Duper";

    // Get the status code and reason phrase 
    var currentStatusCode = hm.current.statusCode;     // 200
    var currentReasonPhrase = hm.current.reasonPhrase; // Super-Duper

    // Also can get the status code and reason phrase off the wire
    var originalStatusCode = hm.original.statusCode;
    var originalReasonPhrase = hm.original.reasonPhrase;

    session.output.write({
        contentType: contentType,
        allHeaders: allHeaders,
        currentStatusCode: currentStatusCode,
        currentReasonPhrase: currentReasonPhrase,
        originalStatusCode: originalStatusCode,
        originalReasonPhrase: originalReasonPhrase
    });
