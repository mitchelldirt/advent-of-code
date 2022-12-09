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

const input = readFile('./day7/day7Input.txt');
// END OF GET FILE INPUT


function factoryDirectory(filesArray, directoriesArray, workingDirectory) {
  if (filesArray.length > 0) {
    workingDirectory.files = filesArray
  }

  if (directoriesArray.length === 0) return workingDirectory;

  for (let dir of directoriesArray) {
    workingDirectory[dir] = {
      parentDirectory: workingDirectory
    }
  }


  return workingDirectory;
}


let fileSystem = {
  home: {

  }
}


function createFile(line) {
  line = line.split(' ');
  return {
    name: line[1],
    size: line[0]
  }
}


function changeDirectory(line, workingDirectory) {
  if (line.includes('..')) {
    return workingDirectory.parentDirectory;
  }
  return workingDirectory[getDirectoryName(line)];
}

function isCommand(line) {
  if (line.includes('$')) return true;
}

function getDirectoryName(line) {
  let splitLine = line.split(' ');

  if (splitLine.length === 2) return splitLine[1];

  return splitLine[2];
}


function createDirectory(input, directory) {

  let isReading = false;

  // directory is just the base object
  let workingDirectory = directory;

  // keeping track of files currently being read
  let dirs = [];
  let files = [];

  const output = input.split('\n');

  for (const line of output) {
    if (isCommand(line) === true && line.includes('ls')) {
      if (dirs.length > 0 || files.length > 0) {
        factoryDirectory(files, dirs, workingDirectory)
      }
      //reset the dirs and files to get ready for a new set
      dirs = [];
      files = [];
      isReading = true;
      continue;
    }

    if (isCommand(line) === true && line.includes('cd')) {
      if (dirs.length > 0 || files.length > 0) {
        factoryDirectory(files, dirs, workingDirectory)
      }
      //reset the dirs and files to get ready for a new set
      dirs = [];
      files = [];
      isReading = false;
      workingDirectory = changeDirectory(line, workingDirectory);
      continue;
    }

    if (isReading === true && line.includes('dir')) {
      dirs.push(getDirectoryName(line));
      continue;
    }

    if (isReading === true && line.includes('dir') === false) {
      files.push(createFile(line))
    }
  }

  if (dirs.length > 0 || files.length > 0) {
    factoryDirectory(files, dirs, workingDirectory)
  }

  while (workingDirectory.hasOwnProperty('parentDirectory')) {
    workingDirectory = workingDirectory.parentDirectory;
  }

  return workingDirectory;

}

const finalDirectory = createDirectory(input, fileSystem);

function sumFiles(arrayOfFiles) {
  let sumOfFiles = 0;
  for (file of arrayOfFiles) {
    sumOfFiles += Number(file.size);
  }

  return sumOfFiles;
}

function sumDirectory(directory) {
  let totalSize = 0;

  for (const prop of Object.entries(directory)) {
    if (prop.includes('parentDirectory')) {
      continue;
    }

    if (prop.includes('files')) {
      totalSize = totalSize + sumFiles(prop[1])
      continue;
    }

    if (prop[1].hasOwnProperty('parentDirectory')) {
      totalSize += sumDirectory(prop[1]);
    }

  }

  return totalSize
}

function findGoodDirectories(homeDirectory) {
  let directories = [homeDirectory];
  let goodDirectories = [];
  let bestDirectory = null;
  let total = 0;

  for (const dir of directories) {
    for (const prop of Object.entries(dir)) {
      if (prop[1].hasOwnProperty('parentDirectory')) {
        if (directories.includes(prop[1])) continue;
        directories.push(prop[1]);
      }
    }
  }

  for (const dir of directories) {
    let currentSum = sumDirectory(dir)
    if (currentSum > 6552309) {
      goodDirectories.push(currentSum)
    }
  }

  for (const dir of goodDirectories) {
    if (!bestDirectory) {
      bestDirectory = dir;
    }

    if (dir < bestDirectory) {
      bestDirectory = dir;
    }
  }
  return bestDirectory;
}

// console.log(findGoodDirectories(finalDirectory))
console.log(findGoodDirectories(finalDirectory))