/* 
https://medium.com/@ankur_anand/implement-your-own-call-apply-and-bind-method-in-javascript-42cc85dba1b
*/

/**
 * Call
 *
 * function.call(thisContext, arg1, arg2, arg3)
 *
 */

function showProfileMessage(message) {
  console.log(message);
  console.log('Name is: ', this.name);
}

const obj = {
  name: 'Ajeet Singh',
};

showProfileMessage('Hi there');

showProfileMessage.call(obj, 'Hello There!');

// this is one way to implementing call function
// but the problem with this is that we have to add function to the object, which modified the passed object
// also we are using es6 syntax
Function.prototype.myCall = function (context, ...rest) {
  // so context represent the object that we pass, i.e. value of 'this' that we pass
  // so we added our own function to the context and call that function on that.
  // in this way value of 'this' will will point to the context that is passed.
  console.log('inside my call');
  context.fn = this;
  context.fn(...rest);
};

// so we are adding a property on the context with a unique id, and then deleting that unique id when
// our task is done, so that it does not have any side effect.
Function.prototype.myCall2 = function (context) {
  context = context || global;
  const uniqueID = '00' + Math.random();
  context[uniqueID] = this;
  const args = [];
  // arguments are saved in strings, using args
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }
  // we are pushing argument passed in args array as 'arguments[1]' , 'arguments[2]'

  // strings are reparsed into statements in the eval method
  // Here args automatically calls the Array.toString() method.

  const result = eval('context[uniqueID](' + args + ')');
  delete context[uniqueID];
  return result;
};

showProfileMessage.myCall2(obj, 'Hello There!');

/**
 * Apply
 * function.apply(thisContext, [argsArray])
 * this is same as call, only difference being that it take an array like object as argument.
 */

Function.prototype.myApply = function (context, arr) {
  console.log('Inside my apply');
  context = context || global;
  const uniqueID = '00' + Math.random();
  context[uniqueID] = this;
  const args = [];
  let result = null;
  // if second argument of array is passed
  if (!arr) {
    result = context[uniqueID]();
  } else {
    for (let i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context[uniqueID](' + args + ')');
  }
  delete context[uniqueID];
  return result;
};

showProfileMessage.myApply(obj, ['Hello My Apply']);

/**
 * Bind Method
 * function.bind(context, arg1, arg2, arg3....)
 * The bind method creates and return a new function, called a bounded function. This bounded function wraps the original function object
 *  “arguments to be prepended to the arguments provided to the bound function, when invoking the target function”.
 *
 *
 */

const person = {
  lastName: 'Singh',
};

function fullName(salutaion, firstName) {
  console.log(salutaion, firstName, this.lastName);
}

const bindFullName = fullName.bind(person, 'Mr');

bindFullName('Ajeet');

// result is Mr Ajeet Singh
// so what happen is argument that is passed at the time of binding is prepended to the bound function

Function.prototype.myBind = function (context) {
  const currentFunction = this;
  console.log('My bind function');

  // we call the slice function with call as argument is not array but array like object
  // we will remove the first argument
  const argumentPassedToBind = Array.prototype.slice.call(arguments, 1);

  // this is the function that we are going to return
  return function boundFunction() {
    // not we will convert the argument passed to this function to array
    const passedArguments = Array.prototype.slice.call(arguments);
    return currentFunction.apply(
      context,
      argumentPassedToBind.concat(passedArguments)
    );
  };
};

const bind2 = fullName.myBind(person, 'Mr');
bind2('Ajeet');
