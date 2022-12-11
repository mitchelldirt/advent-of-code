// PARSING INPUT
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

const input = readFile('./day9/day9Input.txt');
// END OF GET FILE INPUT

// NOTES
// [3, 5] row vs column
// Can go negative [-3, 5]

// When finished create an array and push each array in. As you push in the coords arrays in 
// check if the array already contains that set of coords

// Follow the head around: 
//  HEAD moves 4 right - TAIL moves 3 right (touching each space between current location and current location + 3 right)
//  HEAD moves 3 up - TAIL is not in the same row or column as HEAD move HEAD diagonally then move towards TAIL

// Each position you visit should be logged in positions visited - automatically include starting position [0, 0]

function whichQuadrant(tailCoords, headCoords) {
  if (headCoords[0] < tailCoords[0] && headCoords[1] < tailCoords[1]) {
    return 'LL';
  }

  if (headCoords[0] > tailCoords[0] && headCoords[1] < tailCoords[1]) {
    return 'LR';
  }

  if (headCoords[0] < tailCoords[0] && headCoords[1] > tailCoords[1]) {
    return 'UL';
  }

  if (headCoords[0] > tailCoords[0] && headCoords[1] > tailCoords[1]) {
    return 'UR';
  }
}

function diff(num1, num2) {
  if (num1 > num2) {
    return num1 - num2
  } else {
    return num2 - num1
  }
}

function moveDiagonally(tailCoords, headCoords) {
  // treat this like graph paper... four quadrants
  // ll = negative 1 negative 1
  // ul = negative 1 positive 1
  // lr = positive 1 negative 1
  // ur = positive 1 positive 1
  const quadrant = whichQuadrant(tailCoords, headCoords);
  switch (quadrant) {
    case 'LL':
      tailCoords = [tailCoords[0] - 1, tailCoords[1] - 1];
      break;
    case 'UL':
      tailCoords = [tailCoords[0] - 1, tailCoords[1] + 1];
      break;
    case 'LR':
      tailCoords = [tailCoords[0] + 1, tailCoords[1] - 1];
      break;
    case 'UR':
      tailCoords = [tailCoords[0] + 1, tailCoords[1] + 1];
      break;
  }
  return tailCoords;
}

function moveHorizontally(tailCoords, headCoords) {
  if (tailCoords[0] < headCoords[0]) {
    return [tailCoords[0] + 1, tailCoords[1]];
  } else {
    return [tailCoords[0] - 1, tailCoords[1]];
  }
}

function moveVertically(tailCoords, headCoords) {
  if (tailCoords[1] < headCoords[1]) {
    return [tailCoords[0], tailCoords[1] + 1];
  } else {
    return [tailCoords[0], tailCoords[1] - 1];
  }
}

function moveTail(tailCoords, headCoords) {
  const tailX = tailCoords[0];
  const tailY = tailCoords[1];
  const headX = headCoords[0];
  const headY = headCoords[1];

  if (diff(tailX, headX) >= 1 && diff(tailY, headY) >= 1) {
    return moveDiagonally(tailCoords, headCoords)
  }

  if (diff(tailX, headX) > 1) {
    return moveHorizontally(tailCoords, headCoords)
  }

  if (diff(tailY, headY) > 1) {
    return moveVertically(tailCoords, headCoords)
  }


}

function moveHead(headCoords, instruction) {
  // L = left
  // R = right
  // U = up
  // D = down

  instruction = instruction.split(' ');

  const amountToMove = Number(instruction[1]);

  switch (instruction[0]) {
    case 'L':
      headCoords[0] = headCoords[0] - amountToMove;
      break;
    case 'R':
      headCoords[0] = headCoords[0] + amountToMove;
      break;
    case 'D':
      headCoords[1] = headCoords[1] - amountToMove;
      break;
    case 'U':
      headCoords[1] = headCoords[1] + amountToMove;
      break;
  }

  return headCoords;
}

function isTouching(tailCoords, headCoords) {
  if (tailCoords[0] === headCoords[0] && tailCoords[1] === headCoords[1]) {
    return true;
  }

  if (diff(tailCoords[0], headCoords[0]) === 1 && diff(tailCoords[1], headCoords[1]) === 1) {
    return true;
  }

  if (tailCoords[0] === headCoords[0] && diff(tailCoords[1], headCoords[1]) === 1) {
    return true;
  }

  if (tailCoords[1] === headCoords[1] && diff(tailCoords[0], headCoords[0]) === 1) {
    return true;
  }

  return false;
}

function followRopeHead(instructions) {
  let visitedPositions = [[0, 0]];
  let tailCoords = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
  let headCoords = [0, 0];

  for (const instruction of instructions) {
    headCoords = moveHead(headCoords, instruction);

    while (isTouching(tailCoords[0], headCoords) === false) {
      let nextMove = moveTail(tailCoords[0], headCoords);
      tailCoords[0] = nextMove;
    }

    for (let i = 0; i < 8; i++) {
      while (isTouching(tailCoords[i + 1], tailCoords[i]) === false) {
        let nextMove2 = moveTail(tailCoords[i + 1], tailCoords[i]);
        tailCoords[i + 1] = nextMove2;

        let tailPosition = tailCoords[8]
        visitedPositions.push(tailPosition);
      }
    }
  }
  return visitedPositions;
}



function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (var i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i])
      return false;
  }
  return true;
}

function howManyVisited(visitedArray) {
  let uniqueVisits = [];
  let isUnique = true;

  for (const visit of visitedArray) {

    for (const unique of uniqueVisits) {
      if (arraysEqual(visit, unique) === true) {
        isUnique = false;
      }
    }

    if (isUnique === true) {
      uniqueVisits.push(visit)
    }

    isUnique = true;
  }
  return uniqueVisits.length;
}

const visitedArray = followRopeHead(input.split('\n'));

console.log(howManyVisited(visitedArray));