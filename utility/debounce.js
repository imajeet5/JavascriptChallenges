/* 
 Debounce calls a function when a user hasn’t carried out an event in a specific amount of time.
*/

const el = document.getElementById('debounce');

// Out objective is to call the function after given time but if the function is invoked again before that time then timer is reset

// it is a type of closure, we care a outer scope variable called timerRunning
// then we return a new function, which when called first check if the previous timer is running or not
// if the previous timer is running, we will cancel that and setup new timer.
// in this way function is called if there is no event for the duration specified
const debounce = (fn, time) => {
  let prevTimer;

  return (...args) => {
    clearTimeout(prevTimer);

    // console.log('20: ', timerRunning);
    prevTimer = setTimeout(() => {
      fn(...args);
      //   console.log('23: ', timerRunning);
    }, time);
  };
};

/**
 * The above function will give error because of two reasons
 * 1. Arrow function, this refers to the scope in which they are created, not the score in which they are executed
 * 2. Arrow function does not have access to the argument variable
 */

const debounce2 = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

function x(e, f = 20) {
  console.log('Hi There!!');
  console.log('Arguments Passed', e, f);
  console.log('Value of this: ', this);
}

const debouncedX = debounce(x, 1000);

el.addEventListener('click', debouncedX);
