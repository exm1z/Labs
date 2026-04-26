function asyncMapCallback(arr, fn, done) {
  let result = [];
  let count = 0;
  arr.forEach((item, i) => {
    fn(item, (err, res) => {
      if (err) return done(err);

      result[i] = res;
      count++;

      if (count === arr.length) {
        done(null, result);
      }
    })
  })
}

function asyncMapPromise(arr, fn, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject("Сancel")
    let result = [];
    let count = 0;

    arr.forEach((item, i) => {
      fn(item)
        .then(res => {
          if (signal?.aborted) return reject("Сancel");

          result[i] = res;
          count++;

          if (count === arr.length) {
            resolve(result);
          }
        })
        .catch(reject);
    })
  })
}

function asyncDouble(x, cb) {
  setTimeout(() => cb(null, x * 2), 300);
}
function asyncTriple(x) {
  return new Promise(r => {
    setTimeout(() => r(x * 3), 300)
  })
}

asyncMapCallback([1, 2, 3], asyncDouble, (err, res) => {
  console.log("Callback:", res);
})
asyncMapPromise([1, 2, 3], asyncTriple)
  .then(res => console.log("Promise:", res));

  async function run() {
  const res = await asyncMapPromise([1, 2, 3], asyncTriple);
  console.log("Async/Await:", res);
}
run();

const controller = new AbortController();

asyncMapPromise(
  [1, 2, 3, 4],
  async (x) => {
    return new Promise(r => setTimeout(() => r(x * 2), 500));
  },
  controller.signal
)
.then(res => console.log("Abort:", res))
.catch(err => console.log("Скасовано"));

setTimeout(() => {
  controller.abort();
}, 600);