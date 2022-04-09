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

executeSequentially();
