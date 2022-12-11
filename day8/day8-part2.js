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
  let score = 0;

  while (grid[rowIndex][treeIndex] !== undefined) {
    treeIndex = treeIndex - 1;

    if (treeIndex < 0) {
      break;
    }

    if (currentTree > Number(currentRow[treeIndex])) {
      score = score + 1;
      continue;
    }

    if (currentTree <= Number(currentRow[treeIndex])) {
      score = score + 1;
      break;
    }


  }

  return score;
}

function isVisibleRight(grid, rowIndex, treeIndex, currentRow, currentTree) {
  let score = 0;

  while (grid[rowIndex][treeIndex] !== undefined) {
    treeIndex = treeIndex + 1;

    if (treeIndex > grid[0].length - 1) {
      break;
    }

    if (currentTree > Number(currentRow[treeIndex])) {
      score = score + 1;
      continue;
    }

    if (currentTree <= Number(currentRow[treeIndex])) {
      score = score + 1;
      break;
    }
  }
  return score;
}

function isVisibleFront(grid, rowIndex, treeIndex, currentTree) {
  let score = 0;

  while (grid[rowIndex][treeIndex] !== undefined) {
    rowIndex = rowIndex - 1;

    if (rowIndex < 0) {
      break;
    }

    if (currentTree > Number(grid[rowIndex][treeIndex])) {
      score = score + 1;
      continue;
    }

    if (currentTree <= Number(grid[rowIndex][treeIndex])) {
      score = score + 1;
      break;
    }
  }
  return score;
}

function isVisibleBack(grid, rowIndex, treeIndex, currentTree) {
  let score = 0;

  while (grid[rowIndex][treeIndex] !== undefined) {
    rowIndex = rowIndex + 1;

    if (rowIndex > grid.length - 1) {
      break;
    }

    if (currentTree > Number(grid[rowIndex][treeIndex])) {
      score = score + 1;
      continue;
    }

    if (currentTree <= Number(grid[rowIndex][treeIndex])) {
      score = score + 1;
      break;
    }
  }
  return score;
}

function checkVisibility(grid, rowIndex, treeIndex) {
  let currentRow = grid[rowIndex]
  let currentTree = Number(currentRow[treeIndex]);

  const score1 = isVisibleLeft(grid, rowIndex, treeIndex, currentRow, currentTree);

  const score2 = isVisibleRight(grid, rowIndex, treeIndex, currentRow, currentTree);

  const score3 = isVisibleFront(grid, rowIndex, treeIndex, currentTree);

  const score4 = isVisibleBack(grid, rowIndex, treeIndex, currentTree);

  return score1 * score2 * score3 * score;
}

function totalVisibleTrees(grid) {
  let mostScenic = 0;
  const rowLength = grid[0].length
  let rowIndex;

  for (let i = 0; i <= grid.length - 1; i++) {
    rowIndex = i;
    for (let i = 0; i <= rowLength - 1; i++) {
      treeHouseScore = checkVisibility(grid, rowIndex, i);
      if (treeHouseScore > mostScenic) {
        mostScenic = treeHouseScore;
      }
    }
  }

  return mostScenic;
}

const grid = createGrid(input);

console.log(totalVisibleTrees(grid))