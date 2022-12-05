const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

/** DATA LOAD */
const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .split("\r\n")
  .map((x) => x.split(","))
  .map((x) => x.map((y) => y.split("-")))
  .map((x) => x.map((y) => y.map((z) => parseInt(z, 10))));

const isSubsection = (one, two) => one[0] <= two[0] && one[1] >= two[1];
const isOverlap = (one, two) => one[1] >= two[0] && one[0] <= two[1];

/** PART 1 */
let t0 = performance.now();

let resultOne = 0;

for (const row of data)
  if (isSubsection(row[0], row[1]) || isSubsection(row[1], row[0])) resultOne++;

let t1 = performance.now() - t0;

/** PART 2 */
t0 = performance.now();

let resultTwo = 0;

for (const row of data)
  if (isOverlap(row[0], row[1]) || isOverlap(row[1], row[0])) resultTwo++;

let t2 = performance.now() - t0;

console.log("=============================================");
console.log("Part 1 result:", resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log("=============================================");
console.log("Part 2 result:", resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log("=============================================");
