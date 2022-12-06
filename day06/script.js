const fs = require('fs');
const path = require('path');
const performance = require('perf_hooks').performance;

/** DATA LOAD */
const data = fs
  .readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
  .split('');

/** PART 1 */
let t0 = performance.now();

let resultOne = 0;

const p1buffer = [];
for (let i = 0; i < data.length; i++) {
  p1buffer.push(data[i]);
  if (p1buffer.length > 4) {
    p1buffer.shift();
    const distinctCharacters = Array.from(new Set(p1buffer));
    if (distinctCharacters.length === p1buffer.length) {
      resultOne = i + 1;
      break;
    }
  }
}

let t1 = performance.now() - t0;

/** PART 2 */
t0 = performance.now();

let resultTwo = 0;

const p2buffer = [];
for (let i = 0; i < data.length; i++) {
  p2buffer.push(data[i]);
  if (p2buffer.length > 14) {
    p2buffer.shift();
    const distinctCharacters = Array.from(new Set(p2buffer));
    if (distinctCharacters.length === p2buffer.length) {
      resultTwo = i + 1;
      break;
    }
  }
}

let t2 = performance.now() - t0;

console.log('=============================================');
console.log('Part 1 result:', resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log('=============================================');
console.log('Part 2 result:', resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log('=============================================');
