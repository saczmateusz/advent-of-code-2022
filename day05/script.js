const fs = require('fs');
const path = require('path');
const performance = require('perf_hooks').performance;

/** DATA LOAD */
const data = fs
  .readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
  .split('\r\n');

const labelIndexes = data.findIndex((row) => row[1] === '1');
const stackLabels = data[labelIndexes];
const stackCount = Number(
  stackLabels
    .split(' ')
    .filter((x) => x !== '')
    .pop()
);
const stackRows = data.slice(0, labelIndexes);

const stackP1 = Array.apply(null, Array(stackCount)).map(function () {
  return [];
});

for (let row of stackRows) {
  const rowArr = row.split('');
  for (let i = 0; i < stackCount; i++) {
    const x = rowArr[i * 4 + 1];
    if (x !== ' ') stackP1[i].unshift(x);
  }
}

const stackP2 = JSON.parse(JSON.stringify(stackP1));

const instructions = data
  .slice(labelIndexes + 2)
  .map((r) => r.split(' '))
  .map((r) => ({
    move: Number(r[1]),
    from: Number(r[3]),
    to: Number(r[5]),
  }));

/** PART 1 */
let t0 = performance.now();

let resultOne = '';

for (let instr of instructions) {
  for (let i = 0; i < instr.move; i++) {
    const moved = stackP1[instr.from - 1].pop();
    stackP1[instr.to - 1].push(moved);
  }
}

for (let x of stackP1) {
  resultOne += x.pop();
}

let t1 = performance.now() - t0;

/** PART 2 */
t0 = performance.now();

let resultTwo = '';

for (let instr of instructions) {
  let moved = [];
  for (let i = 0; i < instr.move; i++) {
    moved.unshift(stackP2[instr.from - 1].pop());
  }
  stackP2[instr.to - 1].push(...moved);
}

for (let x of stackP2) {
  resultTwo += x.pop();
}

let t2 = performance.now() - t0;

console.log('=============================================');
console.log('Part 1 result:', resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log('=============================================');
console.log('Part 2 result:', resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log('=============================================');
