// Part 1 & Part 2

import { readFile } from "fs/promises";

const main = async () => {
  try {
    const terminal = (await readFile("input.txt", "utf-8")).trim().split("\n");

    // Store the total size of each dir
    const storages = [];

    // Store the total size of all dirs
    const sizes = [];

    const processLine = (line) => {
      // If line is a command
      if (line.startsWith("$")) {
        const [, command, arg] = line.trim().split(" ");

        // If the command is "cd" and the argument is ".."
        // or an empty string, navigate to the parent dir
        if (command === "cd" && (arg === ".." || arg === "")) {
          // Push the current dir size to the sizes array
          // and remove from storages array
          sizes.push(storages.pop());

          if (storages.length > 0) {
            // Add the current dir size to the size of its parent dir
            storages[storages.length - 1] += sizes[sizes.length - 1];
          }
        } else if (command === "cd") {
          // If the command is "cd" and the argument is not ".." or an empty string,
          // navigate to the specified dir
          // Setting the size of the new dir to 0
          storages.push(0);
        }
      } else if (line.startsWith("dir")) {
        // If the line starts with "dir", it is a new directory
        // Do nothing
      } else {
        // If the line does not start with "$" or "dir", it is a file with a size
        // Convert the size to an integer
        const sizeValue = parseInt(line);

        // Add the size of the file to the size of its parent dir
        storages[storages.length - 1] += sizeValue;
      }
    };

    // Iterate through each line in terminal and call the processLine function
    terminal.forEach(processLine);

    // Iterate through storages and push the size of each dir to the sizes array
    while (storages.length > 0) {
      sizes.push(storages.pop());
      if (storages.length > 0) {
        storages[storages.length - 1] += sizes[sizes.length - 1];
      }
    }

    // Calculate the sum of the sizes of all directories with a size less than
    // or equal to 100000
    const sumLessThan = sizes
      .filter((size) => size <= 100000)
      .reduce((acc, val) => acc + val, 0);

    // Calculate the minimum size of the dirs that have a size greater than
    // or equal to the maximum size minus 40000000
    const minOverLimit = Math.min(
      ...sizes.filter((size) => size >= Math.max(...sizes) - 40000000)
    );

    console.log("Part 1:", sumLessThan);

    console.log("Part 2:", minOverLimit);
  } catch (err) {
    console.error(err);
  }
};

main();
