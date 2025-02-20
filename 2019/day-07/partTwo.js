import { readFile } from "fs/promises";
import allPermutations from "../../utils/allPermutations.js";

const parseInput = (input) => {
  return input.split(",").map(Number);
};

const runProgram = (memory, inputQueue, pointer) => {
  const getParam = (offset, mode) => {
    return mode === 1
      ? memory[pointer + offset]
      : memory[memory[pointer + offset]];
  };

  while (pointer < memory.length) {
    const instruction = memory[pointer].toString().padStart(5, "0");
    const opcode = Number(instruction.slice(3));
    const modes = instruction.slice(0, 3).split("").reverse().map(Number);

    switch (opcode) {
      case 1: // add
        memory[memory[pointer + 3]] =
          getParam(1, modes[0]) + getParam(2, modes[1]);
        pointer += 4;
        break;
      case 2: // multiply
        memory[memory[pointer + 3]] =
          getParam(1, modes[0]) * getParam(2, modes[1]);
        pointer += 4;
        break;
      case 3: // input
        if (inputQueue.length === 0) {
          // No input available
          return { pointer, output: null, halted: false, waiting: true };
        }
        memory[memory[pointer + 1]] = inputQueue.shift();
        pointer += 2;
        break;
      case 4: // output
        const output = getParam(1, modes[0]);
        pointer += 2;
        return { pointer, output, halted: false, waiting: false };
      case 5: // jump-if-true
        if (getParam(1, modes[0]) !== 0) {
          pointer = getParam(2, modes[1]);
        } else {
          pointer += 3;
        }
        break;
      case 6: // jump-if-false
        if (getParam(1, modes[0]) === 0) {
          pointer = getParam(2, modes[1]);
        } else {
          pointer += 3;
        }
        break;
      case 7: // less than
        memory[memory[pointer + 3]] =
          getParam(1, modes[0]) < getParam(2, modes[1]) ? 1 : 0;
        pointer += 4;
        break;
      case 8: // equals
        memory[memory[pointer + 3]] =
          getParam(1, modes[0]) === getParam(2, modes[1]) ? 1 : 0;
        pointer += 4;
        break;
      case 99: // halt
        return { pointer, output: null, halted: true, waiting: false };
      default:
        throw new Error(`Unexpected opcode: ${opcode}`);
    }
  }
  throw new Error("Program did not halt properly");
};

const runAmplifiersFeedback = (originalProgram, phaseSettings) => {
  const amps = phaseSettings.map((phase) => ({
    memory: originalProgram.slice(),
    pointer: 0,
    inputQueue: [phase],
    halted: false,
  }));

  amps[0].inputQueue.push(0);

  let lastOutput = 0;
  let currentAmp = 0;

  // Continue looping until amplifier E halts
  while (!amps[4].halted) {
    const amp = amps[currentAmp];
    if (amp.halted) {
      // Skip if this amplifier already halted
      currentAmp = (currentAmp + 1) % amps.length;
      continue;
    }
    const result = runProgram(amp.memory, amp.inputQueue, amp.pointer);
    amp.pointer = result.pointer;
    if (result.output !== null) {
      // The output from the current amplifier is sent as input to the next
      const nextAmp = amps[(currentAmp + 1) % amps.length];
      nextAmp.inputQueue.push(result.output);
      // Record output if coming from amplifier E
      if (currentAmp === amps.length - 1) {
        lastOutput = result.output;
      }
    }
    if (result.halted) {
      amp.halted = true;
    }
    // Move to the next amplifier
    currentAmp = (currentAmp + 1) % amps.length;
  }
  return lastOutput;
};

const solvePuzzle = (input) => {
  const program = parseInput(input);

  const phasePermutations = allPermutations([5, 6, 7, 8, 9]);

  let highestSignal = 0;

  for (const phaseSetting of phasePermutations) {
    const signal = runAmplifiersFeedback(program, phaseSetting);
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
