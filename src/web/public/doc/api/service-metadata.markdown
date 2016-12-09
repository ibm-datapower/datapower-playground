# Service Metadata

Use the service-metadata module to access service variables within the DataPower platform.
Many service variables are defined in DataPower. These variables provide you a mechanism for
reading or writing DataPower facilities for a given transaction.

Access this module via the `require('service-metadata')` statement.

## API:

Service variables may be accessed in one of two ways. The preferred way is through a dotted
notation. The other way is by using a getVar() or setVar() function call where the variable
is defined with a URL. As an example, the skip-backside variable can be written using the
dotted notation as shown:

    var sm = require ('service-metadata');
    sm.mpgw.skipBackside = true;  // Make the MPGW act as a loopback

Or, the skip-backside variable can be written using the URL via the following:

    var sm = require ('service-metadata');
    sm.setVar ('var://service/mpgw/skip-backside', true);

Both are equivalent, but the preferred and simpler mechanism is to use the dotted notation.
Each service variable is documented in the infocenter. If you know the URL of a service variable,
you can derive the dotted notation by taking the path of the variable after the `service` identifier,
converting the '/' characters to . characters, and converting the variable name to a lower camel
case name. The lower camel case begins with a lower case letter, and removes hyphen characters 
modifying the next sequential character to be upper case.

To read a service variable, you can simply specify the dotted notation variable name. Or, you may
use the getVar() method:

    var sm = require ('service-metadata');
    
    // read the method as a string using dotted notation
    var method = sm.protocolMethod;  

    // read the method as a string using the URL notation
    method = sm.getVar ('var://service/protocol-method');

    // Read entire list of descriptors of variables using the list() method
    var list = sm.list();
    var descSkipBackside = list.filter(function(elm) {
        return elm.name === 'var://service/mpgw/skip-backside';
    })[0];

    session.output.write({
        method: method,
        descSkipBackSide: descSkipBackside
    });

