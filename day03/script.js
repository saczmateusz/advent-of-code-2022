const fs = require("fs");
const path = require("path");
const performance = require("perf_hooks").performance;

/** DATA LOAD */
const data = fs
  .readFileSync(path.join(__dirname, "data.txt"), "utf8")
  .split("\r\n")
  .map((x) => x.split(""));

const dataCopy = JSON.parse(JSON.stringify(data));

const getLetterPriority = (letter) =>
  letter.charCodeAt(0) >= 97
    ? letter.charCodeAt(0) - 96
    : letter.charCodeAt(0) - 38;

/** PART 1 */
let t0 = performance.now();

let resultOne = 0;

const mutilatedData = data.map((y) => [
  [...new Set(y.splice(0, y.length / 2))],
  [...new Set(y)],
]);

for (const row of mutilatedData) {
  const firstRucksack = row[0];
  const secondRucksack = row[1];
  for (const letter of firstRucksack)
    if (secondRucksack.find((sr) => sr == letter))
      resultOne += getLetterPriority(letter);
}

let t1 = performance.now() - t0;

/** PART 2 */
t0 = performance.now();

let resultTwo = 0;

const distinctData = dataCopy.map((y) => [...new Set(y)]);

let i = 0;
while (i < distinctData.length) {
  const row = distinctData[i];

  for (const letter of row)
    if (
      distinctData[i + 1].find((m) => m == letter) &&
      distinctData[i + 2].find((n) => n == letter)
    )
      resultTwo += getLetterPriority(letter);

  i += 3;
}

let t2 = performance.now() - t0;

console.log("=============================================");
console.log("Part 1 result:", resultOne);
console.log(`Execution time: ${t1.toFixed(3)} ms`);
console.log("=============================================");
console.log("Part 2 result:", resultTwo);
console.log(`Execution time: ${t2.toFixed(3)} ms`);
console.log("=============================================");
