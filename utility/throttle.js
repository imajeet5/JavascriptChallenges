/* 
Throttle calls a function at intervals of a specified amount of time while the user is carrying out an event. 
*/

/**
 * The logic of throttle function is as follows
 * 1. Initialize a variable to detect if the function has been called within specified time
 * 2. If the function has been called, pause the throttle function, as next called will not be executed until duration of time has passed
 * 3. After the function has been called, when the passed duration is done, set throttle pause to false
 */

const el = document.getElementById('throttle');

const throttle = (fn, time) => {
  let isPaused = false;

  return (...args) => {
    if (isPaused) return;
    // isPause true mean we will not execute the another until this is false
    isPaused = true;

    setTimeout(() => {
      fn(...args);
      isPaused = false;
    }, time);
  };
};

function x(e, f = 20) {
  console.log('Hi There!!');
  console.log('Arguments Passed', e, f);
  console.log('Value of this: ', this);
}

const throttledX = throttle(x, 1000);

el.addEventListener('click', throttledX);
