# console

Use the Console API to write a log message directly to DataPower system log.
The console namespace is provided without having to require('console') the
functionality.

## console.log([data], [...])

Prints to the DataPower console with a newline. This function can take multiple
arguments using a `printf` style format specifier

    var count = 10;
    console.log('count: %d', count);

If formatting elements are not found in the first string then each argument
is inspected and converted to a string representation

## console.debug([data], [...])

Same as `console.log`. Prints to the DataPower system log at debug level

## console.info([data], [...])

Print the DataPower system log at info level

## console.notice ([data], [...])

Prints to the DataPower system log at notice level

## console.warn([data], [...])

Prints to the DataPower system log at warning level

## console.error([data], [...])

Prints to the DataPower system log at error level

## console.critical([data], [...])

Prints to the DataPower system log at critical level

## console.alert([data], [...])

Prints to the DataPower system log at alert level

## console.emerg([data], [...])

Prints to the DataPower system log at emergency level

## console.trace([data], [...])

Same as `console.debug`.

Example:

    // The following log levels are provided
    console.debug("debug");
    console.info("info");
    console.notice("notice");
    console.warn("warn");
    console.error("error");
    console.critical("critical");
    console.alert("alert");
    console.emerg("emerg");
    console.log("log/info")
    console.trace("trace/debug");

    // Advanced printf style formatting is supported
    // logged as 10011010010 Ӓ 1234 1234 1.234e+3 1.234E+3 1234 2322 'abcd' abcd ABCD 1234 4d2 4D2 "abcd"
    console.log ("%1$b %1$c %1$i %1$d %1$e %1$E %1$f %1$o %2$O %2$s %2$S %1$u %1$x %1$X %2$j", 1234, "abcd");

    // %b binary
    // %c unsigned char
    // %i unsigned decimal
    // %d unsigned decimal
    // %e scientific notation
    // %E scientific notation uppercase
    // %f floating point
    // %o unsigned octal
    // %O object inspect
    // %s string - toString()
    // %S string uppercase
    // %u unsigned decimal
    // %x unsigned hexadecimal
    // %X unsigned hexadecimal uppercase
    // %j JSON.stringify

