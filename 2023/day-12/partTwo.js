import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const lines = await readLines("input.txt");

    const repeatCount = 5;

    let result = 0;

    lines.forEach((line) => {
      let mapSubstring = line.split(" ")[0];

      // Creating an array of numbers from the line
      let numberArray = Array.from(line.matchAll(/\d+/g), (x) => +x[0]);

      // Initializing numbers array with 0
      let numbers = [0];

      // Initializing map string as empty
      let map = "";

      // Concatenating mapSubstring with "?" and concatenating numberArray to numbers, repeatCount times
      Array(repeatCount)
        .fill()
        .forEach(() => {
          map += mapSubstring + "?";
          numbers = numbers.concat(numberArray);
        });

      // Initializing counts as an array of empty arrays
      let counts = Array(map.length)
        .fill()
        .map(() => []);

      // Defining countFunction to calculate counts based on mapIndex and numberIndex
      let countFunction = (mapIndex, numberIndex) => {
        if (mapIndex == -1 && numberIndex == 0) return 1;
        if (counts[mapIndex]) return counts[mapIndex][numberIndex] ?? 0;
        return 0;
      };

      // Calculating counts for each combination of mapIndex and numberIndex
      numbers.forEach((_, numberIndex) => {
        Array(map.length)
          .fill()
          .forEach((_, mapIndex) => {
            let current = 0;
            if (map[mapIndex] != "#")
              current += countFunction(mapIndex - 1, numberIndex);
            if (numberIndex > 0) {
              let doCount = true;
              for (let i = 1; i <= numbers[numberIndex]; i++) {
                if (map[mapIndex - i] == ".") doCount = false;
              }
              if (map[mapIndex] == "#") doCount = false;
              if (doCount)
                current += countFunction(
                  mapIndex - numbers[numberIndex] - 1,
                  numberIndex - 1
                );
            }
            counts[mapIndex][numberIndex] = current;
          });
      });

      // Adding the last element of counts to result
      result += counts[map.length - 1][numbers.length - 1];
    });

    console.log(result);

    return result;
  } catch (err) {
    throw err;
  }
};

main();
