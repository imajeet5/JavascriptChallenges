/**
 * Polyfill for the pipe function in javascript as well as compose function javascript
 */

const p = { name: 'Buckethead' };

const getName = (person) => person.name;
const upperCase = (string) => string.toUpperCase();
get6Characters = (string) => string.substring(0, 6);
reverse = (string) => string.split('').reverse().join('');

// pipe =
//   (...fns) =>
//   (x) =>
//     fns.reduce((v, f) => f(v), x);

const pipe = (...functions) => {
  // this function will return a new function, which will execute the passed functions
  // below function will be execute with the initial value
  debugger;
  return (value) => {
    debugger;
    // this will return the result of calling reduce on the list of the function
    return functions.reduce((currentValue, currentFunction) => {
      debugger;
      // what reduce function will do, is it iterate over the function array, and execute each function with the update result
      return currentFunction(currentValue);
    }, value);
  };
};

const compose = (...functions) => {
  return (value) => {
    return functions.reduceRight((currentValue, currentFunction) => {
      return currentFunction(currentValue);
    }, value);
  };
};

/**
 * Compose function is just the pipe function in the opposite direction.
 * So for it we will use reduceRight instead of reduce function
 * The reduceRight() method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.
 */

const r = pipe(getName, upperCase, get6Characters, reverse)(p);
console.log(r);
const r2 = compose(reverse, get6Characters, upperCase, getName)(p);
console.log(r2);
