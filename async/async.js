const asyncThingsToDo = [
  { task: 'wait', duration: 10000 },
  { task: 'fetch', url: 'https://jsonplaceholder.typicode.com/todos/1' },
  { task: 'wait', duration: 2000 },
  { task: 'fetch', url: 'https://jsonplaceholder.typicode.com/todos/2' },
];

function asyncTimeout(delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(delay), delay);
  }).then((d) => `Waited ${d} seconds`);
}

function asyncFetch(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => `Fetched ${url}, and got back ${JSON.stringify(json)}`);
}

function runTask(spec) {
  return spec.task === 'wait'
    ? asyncTimeout(spec.duration)
    : asyncFetch(spec.url);
}

/**
 * Executing task parallel
 */

const executeParallel = async () => {
  console.log('Executing parallelly');
  const tasks = asyncThingsToDo.map(runTask); // Run all our tasks in parallel.
  const results = await Promise.all(tasks); // Gather up the results.
  results.forEach((x) => console.log(x));
  console.log('\n');
};

// executeParallel();

const executeSequentially = async () => {
  console.log('Executing sequentially');
  const starterPromise = Promise.resolve(null);
  const log = (result) => console.log(result);
  await asyncThingsToDo.reduce((p, spec) => {
    const result = p.then(() => {
      return runTask(spec).then((res) => {
        log(res);
      });
    });
    return result;
  }, starterPromise);
  console.log();
};

// executeSequentially();

/**
 * Promise.all polyfill
 * To implement this we will return a new promise that only resolves once each of the values of the array provided has resolved.
 * Basically we will execute all the promise resolve at the same time.
 * At the same time we will keep the result indexed
 * https://medium.com/@copperwall/implementing-promise-all-575a07db509a#:~:text=all%20can%20be%20implemented%20using,the%20list%20and%20calls%20Promise.
 */

Promise.myall = function (promises) {
  // we will return a new promise that will resolve when all the promises has been resolved
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;
    // this for each will be call on each promise to resolve, in this way all the promises will be resolved
    // simultaneously
    promises.forEach((value, index) => {
      Promise.resolve(value)
        .then((result) => {
          results[index] = result;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    });
  });
};

const timeDurations = [1000, 2000, 3000, 2500, 4000];

const timePromises = timeDurations.map(asyncTimeout);

Promise.myall(timePromises).then((r) => {
  console.log('All promises resolved');
  console.log(r);
});
