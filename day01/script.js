const fs = require('fs');
const path = require('path');
const performance = require('perf_hooks').performance;

/** DATA LOAD */
const data = fs
  .readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
  .split('\n')
  .map((x) => parseInt(x, 10));

/** PART 1 */
let t0 = performance.now();

let resultOne = 0;

const { _, maxVal } = data.reduce(
  ({ prev, max }, curr) =>
    !isNaN(curr)
      ? { prev: prev + curr, max }
      : { prev: 0, max: prev > max ? prev : max },
  { prev: 0, max: 0 }
);
resultOne = maxVal;

let t1 = performance.now() - t0;

/** PART 2 */
t0 = performance.now();

let resultTwo = 0;

const { __, elves } = data.reduce(
  ({ prev, elves }, curr) =>
    !isNaN(curr)
      ? { prev: prev + curr, elves }
      : { prev: 0, elves: [...elves, prev] },
  { prev: 0, elves: [] }
);

resultTwo = elves
  .sort((a, b) => (a < b ? 1 : -1))
  .slice(0, 3)
  .reduce((p, c) => p + c, 0);

let t2 = performance.now() - t0;

console.log('=============================================');
console.log('Part 1 result:', resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log('=============================================');
console.log('Part 2 result:', resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log('=============================================');
