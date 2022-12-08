const input =
  `$ cd /
$ ls
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
    let directory = {
      files: filesArray
    }

  if (!existingDirectory) existingDirectory = directory;  

  if (directoriesArray.length === 0) return directory;

  let name = directoriesArray[0]
  existingDirectory[name] = factoryDirectory([], directoriesArray.slice(1), existingDirectory);


  return directory
}



let fileSystem = {
  home: {

  }
}

console.log(factoryDirectory(['file1', 'file2', 'file3'], ['a', 'b', 'c']))