const fs = require('fs');
const path = require('path');
const performance = require('perf_hooks').performance;

let tTotal0 = performance.now();

/** DATA LOAD */
const data = fs
  .readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
  .split('\r\n')
  .map((x) => x.split(' '))
  .map((x) => ({ instr: x[0], ...(x.length > 1 && { value: Number(x[1]) }) }));

const drawScreen = (screen) => {
  for (let i = 0; i < 6; i++)
    console.log(screen.slice(0 + i * 40, 40 + i * 40).join(''));
};

/** PART 1 */
let t0 = performance.now();

let cycle = 20;
let totalCycles = 0;
let register = 1;
let addxFlag = false;
let resultOne = 0;
for (let i = 0; i < data.length; i++) {
  cycle++;
  totalCycles++;
  if (cycle === 40) {
    resultOne += register * totalCycles;
    cycle = 0;
  }
  if (data[i].instr === 'addx' && addxFlag) {
    register += data[i].value;
    addxFlag = false;
  } else if (data[i].instr === 'addx' && !addxFlag) {
    addxFlag = true;
    i--;
  }
}

let t1 = performance.now() - t0;

/** PART 2 */
t0 = performance.now();

let resultTwo = 0;
let screen = new Array(240);
let row = 0;
cycle = 0;
register = 1;
addxFlag = false;

for (let i = 0; i < data.length; i++) {
  cycle++;
  if (cycle >= register && cycle <= register + 2)
    screen[row * 40 + cycle - 1] = '#';
  else screen[row * 40 + cycle - 1] = '.';
  if (cycle === 40) {
    row++;
    cycle = 0;
  }
  if (data[i].instr === 'addx' && addxFlag) {
    register += data[i].value;
    addxFlag = false;
  } else if (data[i].instr === 'addx' && !addxFlag) {
    addxFlag = true;
    i--;
  }
}

let t2 = performance.now() - t0;
let tTotal1 = performance.now() - tTotal0;

console.log('=============================================');
console.log('Part 1 result:', resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log('=============================================');
console.log('Part 2 result:');
drawScreen(screen);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log('=============================================');
console.log(`Total execution time: ${tTotal1.toFixed(3)} ms`);
console.log('=============================================');
