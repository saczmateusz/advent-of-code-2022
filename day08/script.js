const fs = require('fs');
const path = require('path');
const performance = require('perf_hooks').performance;

let tTotal0 = performance.now();

/** DATA LOAD */
const data = fs
  .readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
  .split('\r\n')
  .map((x) => x.split('').map((y) => Number(y)));

/** PART 1 */
let t0 = performance.now();

let resultOne = data.length * 2 + data[0].length * 2 - 4;
for (let r = 1; r < data.length - 1; r++)
  for (let c = 1; c < data[r].length - 1; c++) {
    let isVisible = false;
    let heights = [];

    for (let up = 0; up < r; up++) heights.push(data[up][c]);
    if (heights.every((h) => h < data[r][c])) isVisible = true;
    heights = [];

    for (let down = r + 1; down < data.length; down++)
      heights.push(data[down][c]);
    if (heights.every((h) => h < data[r][c])) isVisible = true;
    heights = [];

    for (let left = 0; left < c; left++) heights.push(data[r][left]);
    if (heights.every((h) => h < data[r][c])) isVisible = true;
    heights = [];

    for (let right = c + 1; right < data[r].length; right++)
      heights.push(data[r][right]);
    if (heights.every((h) => h < data[r][c])) isVisible = true;

    isVisible && resultOne++;
  }

let t1 = performance.now() - t0;

/** PART 2 */
t0 = performance.now();

let resultTwo = 0;
let scenicScores = [];
for (let r = 1; r < data.length - 1; r++)
  for (let c = 1; c < data[r].length - 1; c++) {
    let distances = [];
    let distance = 0;
    for (let up = r - 1; up >= 0; up--) {
      distance++;
      if (data[up][c] >= data[r][c]) break;
    }
    distances.push(distance);
    distance = 0;

    for (let down = r + 1; down < data.length; down++) {
      distance++;
      if (data[down][c] >= data[r][c]) break;
    }
    distances.push(distance);
    distance = 0;

    for (let left = c - 1; left >= 0; left--) {
      distance++;
      if (data[r][left] >= data[r][c]) break;
    }
    distances.push(distance);
    distance = 0;

    for (let right = c + 1; right < data[r].length; right++) {
      distance++;
      if (data[r][right] >= data[r][c]) break;
    }
    distances.push(distance);

    const scenicScore = distances.reduce((prev, curr) => prev * curr, 1);
    scenicScores.push(scenicScore);
  }

scenicScores.sort((a, b) => (a > b ? -1 : 1));
resultTwo = scenicScores.shift();

let t2 = performance.now() - t0;
let tTotal1 = performance.now() - tTotal0;

console.log('=============================================');
console.log('Part 1 result:', resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log('=============================================');
console.log('Part 2 result:', resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log('=============================================');
console.log(`Total execution time: ${tTotal1.toFixed(3)} ms`);
console.log('=============================================');
