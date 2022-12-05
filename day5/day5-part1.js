// GET FILE INPUT
const fs = require('fs');
const { type } = require('os');

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const input = readFile('./day5/day5Input.txt');
// END OF GET FILE INPUT

let stacks = {
  1: ['W', 'M', 'L', 'F'],
  2: ['B', 'Z', 'V', 'M', 'F'],
  3: ['H', 'V', 'R', 'S', 'L', 'Q'],
  4: ['F', 'S', 'V', 'Q', 'P', 'M', 'T', 'J'],
  5: ['L', 'S', 'W'],
  6: ['F', 'V', 'P', 'M', 'R', 'J', 'W'],
  7: ['J', 'Q', 'C', 'P', 'N', 'R', 'F'],
  8: ['V', 'H', 'P', 'S', 'Z', 'W', 'R', 'B'],
  9: ['B', 'M', 'J', 'C', 'G', 'H', 'Z', 'W']
}

const getInputs = (input) => {
  let resultArray = [];
  let numbersArray = [];
  let numbersHoldingCell = '';
  input = input.split('\n');

  for (let instruction of input) {
    let splitInstruction = instruction.split('');
    let justNumbers = splitInstruction.filter(a => isNaN(a) == false && a !== '' && a != ' ');
    if (justNumbers.length === 3) {
      resultArray.push(justNumbers);
      continue;
    }
    resultArray.push([justNumbers.slice(0, 2).join(''), justNumbers[2], justNumbers[3]])
  }

  return resultArray;
}

const moveCrates = (craneCrates, instructions) => {
  for (let instruction of instructions) {
    let targetArray = craneCrates[instruction[2]];
    let sourceArray = craneCrates[instruction[1]];
    let amountToMove = +instruction[0];

    for (let item of sourceArray.slice(-amountToMove).reverse()) {
      targetArray.push(item);
    }

    craneCrates[instruction[1]] = sourceArray.slice(0, -amountToMove) 

  }

  return craneCrates;
}

console.log(moveCrates(stacks, getInputs(input)));
