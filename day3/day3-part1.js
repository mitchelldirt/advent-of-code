// GET FILE INPUT
const fs = require('fs');
let input;

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    input = data.toString()
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

readFile('./day3Input.txt')
// END OF GET FILE INPUT

const findDuplicate = (string1, string2) => {
  for (let letter of string1.split('')) {
    if (string2.includes(letter)) {
      return letter;
    }
  }
}

const getDuplicates = (inputString) => {
  let resultArray = [];
  // Split on new line
  let inputArray = inputString.split('\n');
  for (let rucksack of inputArray) {
    resultArray.push(findDuplicate(rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)));
  }
  return resultArray;
}

const getPriority = (duplicateArray) => {
  let priority = 0;

  for (let duplicate of duplicateArray) {
    if (duplicate.toUpperCase() === duplicate) {
      priority += (duplicate.charCodeAt(0)) - 38;
    } else {
      priority += (duplicate.charCodeAt(0)) - 96;
    }
  }

  return priority;
}

console.log(getPriority(getDuplicates(input)));

console.log('A'.charCodeAt(0))



