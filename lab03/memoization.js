function memoization(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);

    return result;
  }
}
const add = (a, b) => {
    console.log("first computing");
    return a + b;
}
const memo = memoization(add);

console.log(memo(123456, 987654));
console.log(memo(123456, 987654));
console.log(memo(456, 4112));
console.log(memo(123456, 987654));
console.log(memo(456, 4112));
console.log(memo(456, 4112));