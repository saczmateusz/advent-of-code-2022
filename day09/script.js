const fs = require('fs');
const path = require('path');
const performance = require('perf_hooks').performance;

let tTotal0 = performance.now();

/** DATA LOAD */
const data = fs
  .readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
  .split('\r\n')
  .map((x) => x.split(' '))
  .map((x) => ({ dir: x[0], steps: Number(x[1]) }));

const isUniquePos = (list, pos) =>
  !list.find((p) => p.x === pos.x && p.y === pos.y);

const head = {
  x: 0,
  y: 0,
};

const tail = {
  x: 0,
  y: 0,
};

const positionsMetP1 = [{ x: 0, y: 0 }];

/** PART 1 */
let t0 = performance.now();

let resultOne = 0;
for (const { dir, steps } of data)
  for (let i = 0; i < steps; i++) {
    switch (dir) {
      case 'U':
        head.y += 1;
        if (head.y - tail.y > 1) {
          tail.y += 1;
          if (head.x != tail.x) tail.x = head.x;
        }
        break;

      case 'D':
        head.y -= 1;
        if (tail.y - head.y > 1) {
          tail.y -= 1;
          if (head.x != tail.x) tail.x = head.x;
        }
        break;

      case 'L':
        head.x -= 1;
        if (tail.x - head.x > 1) {
          tail.x -= 1;
          if (head.y != tail.y) tail.y = head.y;
        }
        break;

      case 'R':
        head.x += 1;
        if (head.x - tail.x > 1) {
          tail.x += 1;
          if (head.y != tail.y) tail.y = head.y;
        }
        break;
    }
    isUniquePos(positionsMetP1, tail) && positionsMetP1.push({ ...tail });
  }
resultOne = positionsMetP1.length;

let t1 = performance.now() - t0;

const knots = [];
const positionsMetP2 = [{ x: 0, y: 0 }];
for (let i = 0; i < 10; i++)
  knots.push({
    x: 0,
    y: 0,
  });

/** PART 2 */
t0 = performance.now();

let resultTwo = 0;
for (const { dir, steps } of data)
  for (let i = 0; i < steps; i++) {
    switch (dir) {
      case 'U':
        knots[0].y += 1;
        break;

      case 'D':
        knots[0].y -= 1;
        break;

      case 'L':
        knots[0].x -= 1;
        break;

      case 'R':
        knots[0].x += 1;
        break;
    }

    for (let k = 1; k < 10; k++) {
      let nx = knots[k].x;
      let ny = knots[k].y;

      if (knots[k - 1].y - knots[k].y > 1) {
        ny += 1;
        if (knots[k - 1].x - knots[k].x == 1) nx += 1;
        else if (knots[k].x - knots[k - 1].x == 1) nx -= 1;
      }

      if (knots[k - 1].x - knots[k].x > 1) {
        nx += 1;
        if (knots[k].y - knots[k - 1].y == 1) ny -= 1;
        else if (knots[k - 1].y - knots[k].y == 1) ny += 1;
      }

      if (knots[k].y - knots[k - 1].y > 1) {
        ny -= 1;
        if (knots[k - 1].x - knots[k].x == 1) nx += 1;
        else if (knots[k].x - knots[k - 1].x == 1) nx -= 1;
      }

      if (knots[k].x - knots[k - 1].x > 1) {
        nx -= 1;
        if (knots[k].y - knots[k - 1].y == 1) ny -= 1;
        else if (knots[k - 1].y - knots[k].y == 1) ny += 1;
      }
      knots[k].x = nx;
      knots[k].y = ny;
    }

    isUniquePos(positionsMetP2, knots[9]) &&
      positionsMetP2.push({ ...knots[9] });
  }
resultTwo = positionsMetP2.length;

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
