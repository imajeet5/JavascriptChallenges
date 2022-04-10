/**
 * In this approach we put all the elements of the array in stack
 * then iterate over the element of the stack
 * Now we will start poping elements from the top of stack and check
 * If the element is not an array the push it in result array
 * If the element is an array then we will use the spread operate, to flatten it and put the elements in the stack
 * So by using this approach we can flatten a deeply array
 */

function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // reverse to restore input order
  return res.reverse();
}

/**
 * This is flatDeep function using recursion
 * In this we can pass the depth upto which we want to flatten the array
 */

function flatDeep(arr, d = 1) {
  if (d === 0) {
    return arr.slice();
  }
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      // so here if we encounter an array then we will get the result of flattening this array
      // using the recursion function then we will concat that array into our result array
      let r = flatDeep(val, d - 1);
      return acc.concat(r);
    } else {
      return acc.concat(val);
    }
  }, []);

  //   return d > 0
  //     ? arr.reduce(
  //         (acc, val) =>
  //           acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
  //         []
  //       )
  //     : arr.slice();
}
