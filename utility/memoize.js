const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    const key = args.join('').toString();
    if (cache[key]) {
      console.log('Returning cached result');
      return cache[key];
    }
    cache[key] = fn(...args);
    return cache[key];
  };
};

const add = (a, b) => {
  return a + b;
};

const memoizeAdd = memoize(add);

// window.memoizeAdd = memoizeAdd;
