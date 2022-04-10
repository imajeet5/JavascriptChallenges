/**
 * Deep freeze create an immutable object, by freezing the inner object as well
 */

function deepFreeze(object) {
  const propName = Object.getOwnPropertyNames(object);

  // now check for the underline values, if they are object then we will freeze then as well recursively
  for (const name in propName) {
    const value = object[name];
    // if value is an object, we will recursively call the function
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}
