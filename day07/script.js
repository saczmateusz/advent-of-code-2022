const fs = require('fs');
const path = require('path');
const performance = require('perf_hooks').performance;

let tTotal0 = performance.now();

/** DATA LOAD */
const data = fs
  .readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
  .split('\r\n');

const currentDirectory = [];
const tree = [];

const findElementInTree = (leaves, path) => {
  const leaf = leaves.find((l) => l.path === path && l.isDir);
  if (leaf) return leaf;

  let result = undefined;
  for (let i = 0; i < leaves.length; i++) {
    if (leaves[i].isDir === true) {
      result = findElementInTree(leaves[i].children, path);
      if (result) return result;
    }
  }
  return result;
};

const getSizesLowerThanArg = (node, maxSize) => {
  if (node.isDir) {
    let size = 0;
    node.children.forEach((l) => {
      size += getSizesLowerThanArg(l, maxSize);
    });
    if (size <= maxSize) resultOne += size;
    node.size = size;
    return size;
  } else return node.size;
};

const getSizesHigherThanArg = (node, minSize) => {
  if (node.isDir) {
    node.children.forEach((l) => {
      getSizesHigherThanArg(l, minSize);
    });
    if (node.size >= minSize) matchingSizes.push(node.size);
  }
};

const root = data[0].split(' ');
tree.push({
  name: root[2],
  isDir: true,
  size: 0,
  parent: null,
  children: [],
  path: '/',
});

for (let i = 0; i < data.length; i++) {
  const row = data[i].split(' ');
  if (row[0] === '$' && row[1] === 'cd') {
    if (row[2] === '..') currentDirectory.pop();
    else currentDirectory.push(row[2]);
  } else if (row[0] === '$' && row[1] === 'ls') {
  } else if (row[0] === 'dir') {
    const parent = findElementInTree(tree, currentDirectory.join('/'));
    parent.children.push({
      name: row[1],
      isDir: true,
      size: 0,
      parent: parent.name,
      children: [],
      path: `${currentDirectory.join('/')}/${row[1]}`,
    });
  } else {
    const parent = findElementInTree(tree, currentDirectory.join('/'));
    parent.children.push({
      name: row[1],
      isDir: false,
      size: Number(row[0]),
      parent: parent.name,
      children: null,
      path: `${currentDirectory.join('/')}/${row[1]}`,
    });
  }
}

/** PART 1 */
let t0 = performance.now();

let resultOne = 0;
getSizesLowerThanArg(tree[0], 100000);

let t1 = performance.now() - t0;

/** PART 2 */
t0 = performance.now();

let resultTwo = 0;
const currentDiskUsage = tree[0].size;
const spaceNeeded = 30000000 - (70000000 - currentDiskUsage);
const matchingSizes = [];
getSizesHigherThanArg(tree[0], spaceNeeded);
matchingSizes.sort((a, b) => (a > b ? 1 : -1));
resultTwo = matchingSizes.shift();

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
