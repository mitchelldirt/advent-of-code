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

const input = readFile('./day4/day4Input.txt');
// END OF GET FILE INPUT

// My methodology ------------------------------

// split by line


// Turn num1-num2 into an array of all numbers from num1...num2

// for the larger array perform a loop: largerArray.includes(item from smaller array) if any of them return false 
// Then you can move onto the next pair. If you only get true then add 1 to the resulting number


// -1 until less than first number then return the array

// SOLUTION ------------------------------------

const totalContainedRanges = (inputString) => {
  const inputArray = inputString.split('\n');
  let total = 0;

  for (let pair of inputArray) {
    const pairArray = pair.split(',')
    const range1 = createRange(pairArray[0]);
    const range2 = createRange(pairArray[1]);

    total += isOverlapping(range1, range2)
  }

  return total
}

const createRange = (rangeString) => {
  let resultArray = [];
  let splitNumbers = rangeString.split('-');

  for (let i = +splitNumbers[1]; i >= splitNumbers[0]; i--) {
    resultArray.push(i);
  }

  return resultArray.reverse();
}

const isOverlapping = (array1, array2) => {
  let biggerArray;
  let smallerArray;

  const array1Length = array1.length;
  const array2Length = array2.length;

  if (array1Length > array2Length) {
    biggerArray = array1;
    smallerArray = array2;
  } else if (array1Length < array2Length) {
    biggerArray = array2;
    smallerArray = array1;
  } else {
    biggerArray = array1;
    smallerArray = array2
  }

  for (let item of smallerArray) {
    if (biggerArray.includes(item) === true) {
      return 1;
    }
  }
  return 0;
}

console.log(totalContainedRanges(input))