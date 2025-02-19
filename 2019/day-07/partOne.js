import { readFile } from "fs/promises";
import allPermutations from "../../utils/allPermutations.js";

const parseInput = (input) => {
  return input.split(",").map(Number);
};

const runIntcodeProgram = (program, inputs) => {
  let i = 0;
  let output;

  const getParameterValue = (paramIndex, mode) => {
    return mode ? program[i + paramIndex] : program[program[i + paramIndex]];
  };

  while (i < program.length) {
    const instruction = program[i].toString().padStart(5, "0");
    const opcode = Number(instruction.slice(3));
    const modes = instruction.slice(0, 3).split("").map(Number).reverse();

    switch (opcode) {
      case 1:
        program[program[i + 3]] =
          getParameterValue(1, modes[0]) + getParameterValue(2, modes[1]);
        i += 4;
        break;
      case 2:
        program[program[i + 3]] =
          getParameterValue(1, modes[0]) * getParameterValue(2, modes[1]);
        i += 4;
        break;
      case 3:
        if (inputs.length === 0) {
          throw new Error("No input available");
        }
        program[program[i + 1]] = inputs.shift();
        i += 2;
        break;
      case 4:
        output = getParameterValue(1, modes[0]);
        i += 2;
        break;
      case 5:
        if (getParameterValue(1, modes[0]) !== 0) {
          i = getParameterValue(2, modes[1]);
        } else {
          i += 3;
        }
        break;
      case 6:
        if (getParameterValue(1, modes[0]) === 0) {
          i = getParameterValue(2, modes[1]);
        } else {
          i += 3;
        }
        break;
      case 99:
        return output;
      default:
        throw new Error(`Unexpected opcode: ${opcode}`);
    }
  }

  throw new Error("Program did not halt properly");
};

const runAmplifiers = (originalProgram, phaseSettings) => {
  let inputSignal = 0;
  for (const phase of phaseSettings) {
    const programCopy = [...originalProgram];
    inputSignal = runIntcodeProgram(programCopy, [phase, inputSignal]);
  }
  return inputSignal;
};

const solvePuzzle = (input) => {
  const program = parseInput(input);
  const allPhaseSettingsPermutations = allPermutations([0, 1, 2, 3, 4]);

  let highestSignal = 0;

  for (const phaseSetting of allPhaseSettingsPermutations) {
    const signal = runAmplifiers(program, phaseSetting);
    if (signal > highestSignal) {
      highestSignal = signal;
    }
  }

  return highestSignal;
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
