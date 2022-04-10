/**
 * This is a basic stringify function
 * Supported values are Objects, String, Number
 * If there are nested objects, then we will call the function recursively
 */
function stringify(value) {
  // we take last Key as we don't want to add commas to the last key
  const lastKey = Object.keys(value).pop();
  let objString = '';
  if (typeof value === 'object') {
    // We add the first curly brace
    objString += '{';
    for (const key in value) {
      objString += `"${key}":${stringify(value[key])}`;

      // We add the comma
      if (key !== lastKey) {
        objString += ',';
      }
    }
    // We add the last curly brace
    objString += '}';
  } else if (typeof value === 'string') {
    objString += `"${value}"`;
  } else if (typeof value === 'number') {
    objString += `${value}`;
  }
  return objString;
}

/**
 * https://javascript.plainenglish.io/create-your-own-implementation-of-json-stringify-simiplied-version-8ab6746cdd1
 * Above link is reference for the full function
 */
