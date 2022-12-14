// GET FILE INPUT
const fs = require('fs');

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const input = readFile('./day8/day8Input.txt');
// END OF GET FILE INPUT

function createGrid(input) {
  let grid = [];
  input = input.split('\n');

  for (const row of input) {
    grid.push(row.split(''));
  }

  return grid;
}

function isVisibleLeft(grid, rowIndex, treeIndex, currentRow, currentTree) {
  while (grid[rowIndex][treeIndex] !== undefined) {
    treeIndex = treeIndex - 1;

    if (treeIndex < 0) {
      break;
    }

    if (currentTree <= Number(currentRow[treeIndex])) {
      console.log(grid[rowIndex][treeIndex])
      return false;
    }

    
  }

  return true;
}

function isVisibleRight(grid, rowIndex, treeIndex, currentRow, currentTree) {
  while (grid[rowIndex][treeIndex] !== undefined) {
    treeIndex = treeIndex + 1;

    if (treeIndex > grid[0].length - 1) {
      break;
    }

    if (currentTree <= Number(currentRow[treeIndex])) {
      return false;
    }
  }
  return true;
}

function isVisibleFront(grid, rowIndex, treeIndex, currentTree) {
  while (grid[rowIndex][treeIndex] !== undefined) {
    rowIndex = rowIndex - 1;
    
    if (rowIndex < 0) {
      break;
    }
    if (currentTree <= Number(grid[rowIndex][treeIndex])) {
      return false;
    }
  }
  return true;
}

function isVisibleBack(grid, rowIndex, treeIndex, currentTree) {
  while (grid[rowIndex][treeIndex] !== undefined) {
    rowIndex = rowIndex + 1;

    if (rowIndex > grid.length - 1) {
      break;
    }

    if (currentTree <= Number(grid[rowIndex][treeIndex])) {
      return false;
    }
  }
  return true;
}

function checkVisibility(grid, rowIndex, treeIndex) {
  let currentRow = grid[rowIndex]
  let currentTree = Number(currentRow[treeIndex]);

  if (isVisibleLeft(grid, rowIndex, treeIndex, currentRow, currentTree) === true) return 1;

  if (isVisibleRight(grid, rowIndex, treeIndex, currentRow, currentTree) === true) return 1;

  if (isVisibleFront(grid, rowIndex, treeIndex, currentTree) === true) return 1;

  if (isVisibleBack(grid, rowIndex, treeIndex, currentTree) === true) return 1;

  return 0;
}

function totalVisibleTrees(grid) {
  let total = 0;
  const rowLength = grid[0].length
  let rowIndex;

  total = total + (rowLength * 2);
  total = total + ((grid.length * 2) - 4);

  // skipping outer rows / columns
  for (let i = 1; i <= grid.length - 2; i++) {
    rowIndex = i;
    for (let i = 1; i <= rowLength - 2; i++) {
      total = total + checkVisibility(grid, rowIndex, i);
    }
  }

  return total;
}

const grid = createGrid(input);
console.log(grid)

// console.log(checkVisibility(grid, 1, 2));

console.log(totalVisibleTrees(grid))