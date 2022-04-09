const logicAlbums = [
  'Bobby Tarantino',
  'The Incredible True Story',
  'Supermarket',
  'Under Pressure',
];

// For each: It calls for function on each element of the array

Array.prototype.myForEach = function (cb) {
  console.log('My for each function');
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this);
  }
};

logicAlbums.myForEach((el) => {
  console.log(el);
});

// Array map: call the function on each element of the array and return the result

Array.prototype.mymap = function (cb) {
  console.log('My map');
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i], i, this));
  }
  return result;
};

const r = logicAlbums.mymap((e) => e.toUpperCase());
console.log(r);

// Filter
const albumsWithRating = [
  {
    name: 'Bobby Tarantino',
    rating: 5,
  },
  { name: 'The Incredible True Story', rating: 4.5 },
  {
    name: 'Supermarket',
    rating: 4.9,
  },
  { name: 'Under Pressure', rating: 5 },
];

Array.prototype.myfilter = function (cb, context) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

const r2 = albumsWithRating.myfilter((e) => e.rating > 4.9);
console.log(r2);

// reduce: reduce() function is used to reduce the array to a single value. reduce() accepts a callback function(accumulator, currentValue, index, array) and an initial value
Array.prototype.myreduce = function (callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    // if initial value is passed, accumulator in not undefined. Then accumulator new value will be the
    // result of calling the function with accumulator and current value
    // we have to add this check to avoid 0 check
    if (accumulator !== undefined) {
      accumulator = callback(accumulator, this[i], i, this);
    } else {
      // we don't have accumulator value initially passed
      // value of accumulator will be the first value that is passed
      accumulator = this[i];
    }
  }
  return accumulator;
};

const r3 = logicAlbums.myreduce(function (acc, curr) {
  return acc + ' , ' + curr;
}, 'Young Sinatra');

console.log(r3);
