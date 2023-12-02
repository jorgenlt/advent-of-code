import fs from "fs";
import readline from "readline";
import { numberWordToNumber } from "../utils/numberWordToNumber.js";

// Function to find the first occurrence of a number or number word in a string
const findFirstMatch = (str) => {
  const regex = /(\d|one|two|three|four|five|six|seven|eight|nine|zero)/;
  const match = str.match(regex);

  // If no match found, log a message and return null
  if (!match) {
    console.log("Could not find any match in: ", str);
    return null;
  }

  return match[0];
};

// Function to find the last occurrence of a number or number word in a string
const findLastMatch = (str) => {
  const regex = /(\d|one|two|three|four|five|six|seven|eight|nine|zero)/;

  let lastMatch;

  // Looping backwards through the string
  for (let i = str.length - 1; i >= 0; i--) {
    const substr = str.slice(i);
    const match = substr.match(regex);
    if (match) {
      lastMatch = match[0];
      break;
    }
  }

  // If no match found, log a message and return null
  if (!lastMatch) {
    console.log("Could not find any match in: ", str);
    return null;
  }

  return lastMatch;
};

// Function to process input line by line and sum calibration numbers
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
      const firstNum = numberWordToNumber(findFirstMatch(line));
      const lastNum = numberWordToNumber(findLastMatch(line));

      // Continue if no numbers found on the line
      if (!firstNum && !lastNum) continue;

      digits.push(Number("" + firstNum + lastNum));
    }
    const sumOfDigits = digits.reduce((acc, curr) => acc + curr, 0);

    console.log("Sum of calibration numbers = ", sumOfDigits);
  } catch (err) {
    console.error("Error: ", err);
  }
};

sumCalibrationNumbers();
