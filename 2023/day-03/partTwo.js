import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const input = await readLines("input.csv");

    // Define the width and height of the input
    const width = input[0].length;
    const height = input.length;

    // Variable to store the sum
    let sum = 0;

    // Array to store the numbers
    const numbers = [];

    // Loop through the input to find all numbers
    for (let i = 0; i < height; i++) {
      let num = "";
      let x = [];

      for (let j = 0; j < width; j++) {
        const current = input[i][j];

        // Check if the current character is a number
        if (!isNaN(parseInt(current))) {
          num += current;
          x.push(j);
        }

        // If the current character is not a number or it's the last character in the row, store the number
        if (num !== "" && (isNaN(parseInt(current)) || j === width - 1)) {
          numbers.push({ num: Number(num), y: i, x: x.slice() });
          num = "";
          x = [];
        }
      }
    }

    // Loop through the input to find all gears
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const current = input[i][j];

        // Check if the current character is a gear
        if (current === "*") {
          // Get the neighbor numbers of the gear
          const neighbourNumbers = getNeighbourNumbers(
            i,
            j,
            numbers,
            height,
            width,
            input
          );

          // If the gear has exactly two neighbor numbers, add their product to the sum
          if (neighbourNumbers.size === 2) {
            const nums = [...neighbourNumbers];
            sum += nums[0].num * nums[1].num;
          }
        }
      }
    }

    // Log the final sum
    console.log(sum);
  } catch (err) {
    console.error(err);
  }
};

// Define a function to get the neighbor numbers of a gear
const getNeighbourNumbers = (i, j, numbers, height, width, input) => {
  // Initialize a Set to store the neighbor numbers
  const neighbourNumbers = new Set();

  // Loop through the neighboring cells
  for (let k = -1; k <= 1; k++) {
    for (let l = -1; l <= 1; l++) {
      // Check if the cell is within the bounds and contains a number
      if (
        i + k >= 0 &&
        i + k < height &&
        j + l >= 0 &&
        j + l < width &&
        !isNaN(parseInt(input[i + k][j + l]))
      ) {
        // Find the number in the cell and add it to the Set
        const neighbourNum = numbers.find(
          (n) => n.y === i + k && n.x.includes(j + l)
        );
        neighbourNumbers.add(neighbourNum);
      }
    }
  }

  // Return the Set of neighbor numbers
  return neighbourNumbers;
};

// Call the main function
main();
