# urlopen 

Use the urlopen module to send requests and receive responses in your GatewayScript Action.

Access this module via the `require ('urlopen')` statement. There are actually two objects
involved within the urlopen. The first is the urlopen object which is used to initiate the
request. The second is the `response` object that can be read just as though it were a context.

Note that every urlopen transaction requires two instructions. The first is the initiation of
the request via an open() function call. The second is the completion of the urlopen by invoking
either a response.readAsXXX() method, a response.discard() method, or a response.disconnect()
method. If there is no instructions invoking these three methods in urlopen open() function callback,
an implicit disconnect() will be issued to complete the transaction.

## Methods:

## .open(options, function(error, response) {}) 

Asynchronously send a request to a specified URL

## .response.readAsBuffer(function(error, buffer) {})

Read the response into a Buffer object

## .response.readAsBuffers(function(error, buffers) {})

Read the response into a Buffers object

## response.readAsJSON(function(error, json) {})

Read the response into a JSON object

## response.discard(function(error) {})

Discard the response. This method instructs the urlopen to consume but discard the bytes of the response message in an efficient manor. You may still access the header metadata from the response object.

## response.disconnect()

Disconnect the connection without reading data from the response. This method is similar to discard, except it will disconnect the connection without possibly reading all of the response data from the network. This is the most efficient API, but can cause server side errors. You may still access the header metadata from the response.

## .response.headers

Reads the entire collection of response headers into a JSON object.

## .response.statusCode 

Reads the status code from the urlopen response

## .response.reasonPhrase 

Reads the reason phrase from the urlopen response.

The options object to the urlopen.open() method is as follows:
The options object can be either a String or JSON object. If it is a JSON object, it describes
the configurations used for establish an urlopen connection. Refer to the following code snippet
showing the configurable options.
 
    var options = {
      // the target URL
      target: 'http://example.com/test.xml',  
      // get, delete, head, post, and put. case insensitive
      method: 'POST',
      // JSON object represents the HTTP(s) headers to be sent to the target
      headers: {Accept: text/plain, Accept-Charset: utf-8 }, 
      // the data content type
      contentType: 'application/json', 
      // timeout in seconds
      timeout: 60, 
      // Optional. SSL proxy profile defined in the datapower management store
      sslProfile: 'sslProxyProfileName', 
      // the data to be sent to the target when method is POST or PUT.
      // for other method, data is ignored.
      data: data, 
    };

The data property can be any of the following:
* String: the string would be encoded as utf8 and send to the target
* Buffer or Buffers: the bytes in the buffer / buffers will be sent as is to the target
* All others (including object or primitive types, like Boolean): the data will be stringified
  as a JSON string (utf-8 encoded) and sent to the target

If the options object is a String, it is considered to be a urlopen target URL. The method used is
assumed to be an HTTP Get method.

The following is an example of how to send an HTTPS Post request that uses the specified SSL Proxy
Profile. It sends the payload containing 'Hello Datapower GatewayScript'. It then checks for error
and reads the response into a Buffer.

    // use the urlopen module
    var urlopen = require ('urlopen');

    // define the urlopen options
    var options = {
        target: 'http://127.0.0.1:42410/echo',
        // if target is https, supply a sslProxyProfile
        // target: 'https://127.0.0.1:42409/echo',
        // sslProxyProfile: 'alice-sslproxy-forward-trusted',
        method: 'post',
        headers: { 'X-My-Header1' : 'value1', 'X-My-Header2' : 'value2' },
        contentType: 'application/json',
        timeout: 60,
        data: "Hello DataPower GatewayScript",
    };

    // open connection to target and send data over
    urlopen.open (options, function (error, response) {
        if (error) {
            // an error occurred during request sending or response header parsing
            session.output.write ("urlopen connect error: " + JSON.stringify(error));
        } else {
            // read response data
            // get the response status code
            var responseStatusCode = response.statusCode;
            if (responseStatusCode == 200) {
                response.readAsBuffer(function(error, responseData) {
                    if (error) {
                        // error while reading response or transferring data to Buffer
                        session.output.write("readAsBuffer error: " + JSON.stringify(error));
                    } else {
                        session.output.write(responseData);
                    } 
                });
            } else {
                session.output.write ("urlopen target return statusCode " + responseStatusCode);
            }
        }
    }); // end of urlopen.open()

The following is another example of how to read local file system file via urlopen. For current release,
user is only allowed to read file. In this example, urlopen reads local:///example.txt and writes it to
output context.

    // use the urlopen module
    var urlopen = require ('urlopen');

    // define the urlopen options
    var options = {
        target: 'local:///example.txt',
        // method is optional. By default, method is get.
        method: 'get',
    };

    // open connection to target
    urlopen.open (options, function (error, response) {
        if (error) {
            // an error occurred during reading the file
            session.output.write ("urlopen connect error: " + JSON.stringify(error));
        } else {
            // read response data
            // response.statusCode === 200: Successfully open file
            // response.statusCode === 403: Permission denied (e.g. store:///dp is write only, cannot read)
            // response.statusCode === 404: File not found
            // response.statusCode === 500: Other open file error
            var responseStatusCode = response.statusCode;
            if (responseStatusCode == 200) {
                response.readAsBuffer(function(error, responseData) {
                    if (error) {
                        // error while reading response or transferring data to Buffer
                        session.output.write("readAsBuffer error: " + JSON.stringify(error));
                    } else {
                        session.output.write(responseData);
                    } 
                });
            } else {
                session.output.write ("urlopen target return statusCode " + responseStatusCode);
            }
        }
    }); // end of urlopen.open()

If target file is not existed, response.statusCode returns 404. If target file users don't have permission 
to access, response.statusCode returns 403.
