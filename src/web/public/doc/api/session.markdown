# Session 

Use the session object to create and to access context objects. The session
object is unique for each individual transaction. It is used as the object
through which access to the various contexts is provided. The session object
is automatically available. No `require('session')` statement is required.

Examples:

    // Access the input context of an action
    session.input; 

    // Access the output context of an action
    session.output; 

    // Access the `INPUT` context. The `INPUT` context is the payload of the
    // request (for a request rule) or response (for a response rule) as it is
    // received directly from the network.
    session.INPUT;

    // session.OUTPUT - this is not allowed.
    // session.NULL  -  this is not allowed.
    // session.PIPE  -  this is not allowed.

    // The session object also has functions that allow you to create named
    // contexts and to access them. A named context is a buffer area that can
    // be used to temporarily hold data and can be used as input to an action
    // or as the output from an action. Named contexts only exist during the
    // life of a transaction.

    session.name('myContext'); // access the context named `myContext`
    session.createContext('myContext'); // create a context named `myContext`

    // Contexts can be read into a Buffer, Buffers, or JSON object. Contexts
    // can be written using the write() method. For additional information on
    // the methods to read and write a context, see the Context object.
