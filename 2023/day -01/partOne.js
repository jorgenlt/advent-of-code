import fs from "fs";
import readline from "readline";

// Process input line by line
const sumCalibrationNumbers = async () => {
  try {
    const digits = [];

    // Creating readable stream from input file
    const fileStream = fs.createReadStream("input.csv");

    // Creating an interface for reading data from filestream
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    // Looping through each line in input
    for await (const line of rl) {
      const numbers = line.match(/\d/g);

      // Continue if no numbers found on the line
      if (!numbers) continue;

      if (numbers.length === 1) {
        digits.push(Number(numbers[0] + numbers[0]));
      } else {
        const firstNum = numbers[0];
        const lastNum = numbers[numbers.length - 1];
        digits.push(Number(firstNum + lastNum));
      }
    }

    const sumOfDigits = digits.reduce((acc, curr) => acc + curr, 0);

    console.log("Sum of all digits = ", sumOfDigits);
  } catch (err) {
    console.error("Error: ", err);
  }
};

sumCalibrationNumbers();
