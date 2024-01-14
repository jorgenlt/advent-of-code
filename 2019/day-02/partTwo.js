import { readFile } from "fs/promises";

// Function to get every combination of two numbers from 0-99
const getNumberCombinations = () => {
  let combinations = [];
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      combinations.push([i, j]);
    }
  }
  return combinations;
};

const processIntcode = (input) => {
  for (
    let instructionPointer = 0;
    instructionPointer < input.length;
    instructionPointer += 4
  ) {
    const instructions = [
      input[instructionPointer],
      input[instructionPointer + 1],
      input[instructionPointer + 2],
      input[instructionPointer + 3],
    ];

    const opcode = instructions[0];

    if (opcode === 99) break;

    const parameters = [instructions[1], instructions[2], instructions[3]];

    const input1 = input[parameters[0]];
    const input2 = input[parameters[1]];

    const outputPos = parameters[2];

    if (opcode === 1) input[outputPos] = input1 + input2;

    if (opcode === 2) input[outputPos] = input1 * input2;
  }

  return input[0];
};

// A position in memory is called an address (for example, the first value in memory is at "address 0").
// Instruction: Opcodes (like 1, 2, or 99) mark the beginning of an instruction.
// Parameters: The values used immediately after an opcode, if any, are called the instruction's parameters.

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split(",")
      .map(Number);

    const combinations = getNumberCombinations();

    // Determine what pair of inputs produces the output 19690720."
    for (let i = 0; i < combinations.length; i++) {
      const intcode = [...input];

      const noun = combinations[i][0];
      const verb = combinations[i][1];

      intcode[1] = noun;
      intcode[2] = verb;

      const result = processIntcode(intcode);

      if (result === 19690720) {
        console.log("Answer:", 100 * noun + verb);
        return;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

main();
