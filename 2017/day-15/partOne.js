import { readFile } from "fs/promises";
import decimalToBinary from "../../utils/decimalToBinary.js";

const parseInput = (input) => {
  return input.match(/\d+/g).map(Number);
};

const generateValue = (value, generator) => {
  if (generator !== "A" && generator !== "B") {
    throw new Error("Invalid generator.");
  }

  const generatorFactor = generator === "A" ? 16807 : 48271;

  return (value * generatorFactor) % 2147483647;
};

const isMatch = (a, b) => {
  const lowest16BitsA = a.slice(a.length - 16);
  const lowest16BitsB = b.slice(b.length - 16);

  return lowest16BitsA === lowest16BitsB;
};

const solvePuzzle = (input) => {
  let [valueA, valueB] = parseInput(input);

  let pairsCount = 0;

  for (let i = 0; i < 40000000; i++) {
    const newValueA = generateValue(valueA, "A")
    const newValueB = generateValue(valueB, "B")

    const binaryA = decimalToBinary(newValueA)
    const binaryB = decimalToBinary(newValueB)

    // console.log("binaryA:", binaryA)
    // console.log("binaryB:", binaryB)

    // console.log("---")


    if (isMatch(binaryA, binaryB)) {
      pairsCount++;
    }

    valueA = newValueA;
    valueB = newValueB;
  }


  // console.log("valueA", valueA)
  // console.log(generateValue(valueA, "A"))
  // console.log(decimalToBinary(generateValue(valueA, "A")))



  // const binaryA = decimalToBinary(generateValue(245556042, "A"))
  // console.log("binaryA:", binaryA)
  // const binaryB = decimalToBinary(generateValue(1431495498, "B"))
  // console.log("binaryB:", binaryB)

  // console.log(isMatch(binaryA, binaryB))
  

  return pairsCount;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
