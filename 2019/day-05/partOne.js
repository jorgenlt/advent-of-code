import { readFile } from "fs/promises";

// A position in memory is called an address (for example, the first value in memory is at "address 0").
// Instruction: Opcodes (like 1, 2, or 99) mark the beginning of an instruction.
// Parameters: The values used immediately after an opcode, if any, are called the instruction's parameters.

const runIntcodeProgram = (program) => {
  let i = 0;

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
        program[program[i + 1]] = 1; // Setting input value 1 as specified
        i += 2;
        break;
      case 4:
        console.log(getParameterValue(1, modes[0])); // Output the diagnostic code
        i += 2;
        break;
      case 99:
        return program[0];
      default:
        throw new Error(`Unexpected opcode: ${opcode}`);
    }
  }

  throw new Error("Program did not halt properly");
};

const main = async () => {
  try {
    const program = (await readFile("input.txt", "utf-8"))
      .trim()
      .split(",")
      .map(Number);

    runIntcodeProgram(program);
  } catch (err) {
    console.error(err);
  }
};

main();
