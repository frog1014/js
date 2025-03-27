### A port of Kotlin's scope functions to JavaScript.
https://medium.com/@frog1014/a-port-of-kotlins-scope-functions-to-javascript-e58fa7270df6

The Kotlin standard library contains several functions whose sole purpose is to execute a block of code within the context of an object. When you call such a function on an object with a lambda expression provided, it forms a temporary scope. In this scope, you can access the object without its name. Such functions are called scope functions. There are five of them: let, run, with, apply, and also.

Basically, these functions do the same: execute a block of code on an object. What's different is how this object becomes available inside the block and what is the result of the whole expression.
more details for official tutorial, ref: https://kotlinlang.org/docs/reference/scope-functions.html

Here is a short guide for choosing scope functions depending on the intended purpose:

- Introducing an expression as a variable in local scope: let
- Object configuration: also
