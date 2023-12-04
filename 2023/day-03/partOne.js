import { readLines } from "../utils/readLines.js";

const sumMachinePartsNumbers = async () => {
  try {
    let sum = 0;

    // Read in the engine schematic line by line
    const lines = await readLines("input.csv");

    // Iterate through each line
    for (let i = 0; i < lines.length; i++) {
      // To store numbers
      let tempNum = "";

      let line = lines[i];
      let splitLine = line.split("");

      // Iterate through each character
      for (let j = 0; j <= splitLine.length; j++) {
        let char = splitLine[j];

        // Checking if char is a number, append it to tempNum if true
        if (!isNaN(parseInt(char))) {
          tempNum += char;
        } else {
          // Checking if tempNum is a number, tempNum is complete if true
          if (!isNaN(parseInt(tempNum))) {
            // Checking surrounding locations for symbol
            const isSymbolFound = isSurroundingLocationsSymbol(
              lines[i],
              lines[i - 1],
              lines[i + 1],
              j - tempNum.length,
              tempNum.length
            );

            // If symbol found: add number to sum
            if (isSymbolFound) {
              sum += parseInt(tempNum);
            }
          }

          // Resetting tempNum
          tempNum = "";
        }
      }
    }

    console.log("sum: ", sum);
  } catch (err) {
    console.error(err);
  }
};

// Function to check if a character is a symbol (not a number or period)
const isCharSymbol = (line, charIndex) => {
  const regex = /[^\d.]/g;
  if (line && line[charIndex]) {
    // Return true if the character at charIndex is a symbol
    return regex.test(line[charIndex]);
  }
  return false;
};

// Function to check if any of the surrounding locations around a number contain a symbol
const isSurroundingLocationsSymbol = (
  line,
  prevLine,
  nextLine,
  charIndex,
  numLength
) => {
  const topLeft = isCharSymbol(prevLine, charIndex - 1);
  const bottomLeft = isCharSymbol(nextLine, charIndex - 1);
  const topRight = isCharSymbol(prevLine, charIndex + numLength);
  const bottomRight = isCharSymbol(nextLine, charIndex + numLength);
  const prevChar = isCharSymbol(line, charIndex - 1);
  const nextChar = isCharSymbol(line, charIndex + numLength);
  let top = false;
  let bottom = false;

  // Top and bottom locations
  for (let i = charIndex; i <= charIndex + numLength - 1; i++) {
    if (isCharSymbol(prevLine, i)) {
      top = true;
    }
    if (isCharSymbol(nextLine, i)) {
      bottom = true;
    }
  }

  // Return true only if any variables are true
  return (
    topLeft ||
    bottomLeft ||
    topRight ||
    bottomRight ||
    prevChar ||
    nextChar ||
    top ||
    bottom
  );
};

sumMachinePartsNumbers();
