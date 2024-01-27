import { readFile } from "fs/promises";

// Function to count bits of specific value
const countBits = (data, position, bitValue) => {
  return data.filter((num) => num[position] === bitValue).length;
};

const main = async () => {
  try {
    const data = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((str) => str.split("").map((b) => parseInt(b)));

    // Store copy of data for oxygen generator rating
    let oxygenData = [...data];

    // Store copy of data for CO2 scrubber rating
    let co2Data = [...data];

    // Get length of binary numbers
    const dataLength = data[0].length;

    // Loop through each bit position
    for (let i = 0; i < dataLength; i++) {
      // Calculate oxygen generator rating if more than one rating left
      if (oxygenData.length > 1) {
        // Get counts of 0 and 1 bits in current position
        const bit0 = countBits(oxygenData, i, 0);
        const bit1 = countBits(oxygenData, i, 1);

        // Determine most common bit in current position
        const commonBit = bit0 > bit1 ? 0 : 1;

        // Filter numbers with uncommon bit in current position
        oxygenData = oxygenData.filter((num) => num[i] === commonBit);
      }

      // Calculate CO2 scrubber rating if more than one rating left
      if (co2Data.length > 1) {
        // Get counts of 0 and 1 bits in current position
        const bit0 = countBits(co2Data, i, 0);
        const bit1 = countBits(co2Data, i, 1);

        // Determine least common bit in current position
        const uncommonBit = bit0 <= bit1 ? 0 : 1;

        // Filter numbers with common bit in current position
        co2Data = co2Data.filter((num) => num[i] === uncommonBit);
      }
    }

    // Convert binary oxygen rating to decimal
    const oxygenRating = parseInt(oxygenData[0].join(""), 2);

    // Convert binary CO2 rating to decimal
    const co2Rating = parseInt(co2Data[0].join(""), 2);

    // Calculate and log life support rating
    console.log(oxygenRating * co2Rating);
  } catch (err) {
    console.error(err);
  }
};

main();
