const fs = require('fs');
const path = require('path');
const performance = require('perf_hooks').performance;

/** DATA LOAD */
const data = fs
  .readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
  .split('\r\n')
  .map((x) => x.split(' '))
  .map((y) => ({ elf: y[0], me: y[1] }));

const selectedShapeScoring = (shape) => {
  switch (shape) {
    case 'X':
    case 'A':
      return 1;
    case 'Y':
    case 'B':
      return 2;
    case 'Z':
    case 'C':
      return 3;
  }
};

const roundScoring = (shapes) => {
  switch (shapes.me) {
    case 'X':
    case 'A':
      switch (shapes.elf) {
        case 'A':
          return 3;
        case 'B':
          return 0;
        case 'C':
          return 6;
      }
    case 'Y':
    case 'B':
      switch (shapes.elf) {
        case 'A':
          return 6;
        case 'B':
          return 3;
        case 'C':
          return 0;
      }
    case 'Z':
    case 'C':
      switch (shapes.elf) {
        case 'A':
          return 0;
        case 'B':
          return 6;
        case 'C':
          return 3;
      }
  }
};

const getShapeMatchingToResult = (shapes) => {
  switch (shapes.me) {
    case 'X':
      switch (shapes.elf) {
        case 'A':
          return 'C';
        case 'B':
          return 'A';
        case 'C':
          return 'B';
      }
    case 'Y':
      switch (shapes.elf) {
        case 'A':
          return 'A';
        case 'B':
          return 'B';
        case 'C':
          return 'C';
      }
    case 'Z':
      switch (shapes.elf) {
        case 'A':
          return 'B';
        case 'B':
          return 'C';
        case 'C':
          return 'A';
      }
  }
};

/** PART 1 */
let t0 = performance.now();

let resultOne = 0;

data.forEach(
  (row) => (resultOne += selectedShapeScoring(row.me) + roundScoring(row))
);

let t1 = performance.now() - t0;

/** PART 2 */
t0 = performance.now();

let resultTwo = 0;

data.forEach((row) => {
  const shapeNeeded = getShapeMatchingToResult(row);
  resultTwo +=
    selectedShapeScoring(shapeNeeded) +
    roundScoring({ elf: row.elf, me: shapeNeeded });
});

let t2 = performance.now() - t0;

console.log('=============================================');
console.log('Part 1 result:', resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log('=============================================');
console.log('Part 2 result:', resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log('=============================================');
