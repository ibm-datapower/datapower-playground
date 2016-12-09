# Sprintf

This module is used to format strings using a printf syntax, you can access it with `require("sprintf")`.

## JavaScript sprintf()
sprintf.js is a complete sprintf implementation.

Its prototype is simple:

        string sprintf(string format , [mixed arg1 [, mixed arg2 [ ,...]]]);

The placeholders in the format string are marked by "%" and are followed by one or more of these elements, in this order:
* An optional "+" sign that forces to preceed the result with a plus or minus sign on numeric values. By default, only the "-" sign is used on negative numbers.
* An optional padding specifier that says what character to use for padding (if specified). Possible values are 0 or any other character precedeed by a '. The default is to pad with spaces.
* An optional "-" sign, that causes sprintf to left-align the result of this placeholder. The default is to right-align the result.
* An optional number, that says how many characters the result should have. If the value to be returned is shorter than this number, the result will be padded.
* An optional precision modifier, consisting of a "." (dot) followed by a number, that says how many digits should be displayed for floating point numbers. When used on a string, it causes the result to be truncated.
* A type specifier that can be any of:
    * % — print a literal "%" character
    * b — print an integer as a binary number
    * c — print an integer as the character with that ASCII value
    * d — print an integer as a signed decimal number
    * i — print an integer as a signed decimal number
    * e — print a float as scientific notation (lower-case)
    * E — print a float as scientific notation (upper-case)
    * u — print an integer as an unsigned decimal number
    * f — print a float as is
    * o — print an integer as an octal number
    * O — print the content of an Object
    * s — print a string as is (lower-case)
    * S — print a string as is (upper-case)
    * x — print an integer as a hexadecimal number (lower-case)
    * X — print an integer as a hexadecimal number (upper-case)
    * j — print an object with JSON stringify

## JavaScript vsprintf()
vsprintf() is the same as sprintf() except that it accepts an array of arguments, rather than a variable number of arguments:

        vsprintf('The first 4 letters of the english alphabet are: %s, %s, %s and %s', ['a', 'b', 'c', 'd']);

## Argument swapping
You can also swap the arguments. That is, the order of the placeholders doesn't have to match the order of the arguments. You can do that by simply indicating in the format string which arguments the placeholders refer to:

        sprintf('%2$s %3$s a %1$s', 'cracker', 'Polly', 'wants');
And, of course, you can repeat the placeholders without having to increase the number of arguments.

## How to

        var sprintf = require("sprintf").sprintf;
        var vsprintf = require("sprintf").vsprintf;

        console.log(sprintf("%2$s %3$s a %1$s", "cracker", "Polly", "wants"));
        console.log(vsprintf("The first 4 letters of the english alphabet are: %s, %s, %s and %s", ["a", "b", "c", "d"]));

