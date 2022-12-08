const input =
  `$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

function factoryDirectory(filesArray, directoriesArray, existingDirectory) {
  // let directory = {
  //   files: filesArray
  // }

  // if (!existingDirectory) existingDirectory = directory;
  if (filesArray.length > 0) {
    existingDirectory.files = filesArray
  }

  if (directoriesArray.length === 0) return existingDirectory;

  for (let dir of directoriesArray) {
    existingDirectory[dir] = {}
  }


  return existingDirectory
}



let fileSystem = {

}

function createFile(line) {
  line = line.split(' ');
  return {
    name: line[1],
    size: line[0]
  }
}

function changeDirectory(line, directoryStack) {
  if (line.includes('..')) {
    directoryStack.pop();
    return directoryStack;
  }
  directoryStack.push(directoryStack[directoryStack.length - 1][getDirectoryName(line)]);
  return directoryStack;
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

  // keep track of past movements by using a stack… so that you can do $ cd ..
  let directoryStack = [directory]

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
      directoryStack = changeDirectory(line, directoryStack);
      workingDirectory = directoryStack[directoryStack.length - 1]
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

  return directoryStack[directoryStack.length - 1]

}

console.log(createDirectory(input, fileSystem))


//TODO: Maybe add parent directory to each child directory similarly to a linked list