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

const input = readFile('./day6/day6Input.txt');
// END OF GET FILE INPUT

const getCode = (inputString) => {
  let codeString = '';
  let position = 0;
  
  for (let character of      inputString.split('')) {
    if (codeString.length === 4) {
      return position;
    } else if (codeString.includes(character)) {
      let index = codeString.indexOf(character)
      codeString = codeString.slice(index + 1)
      codeString += character
    } else {
      codeString += character
    }
    
    position++
  }
}

console.log(getCode(input))