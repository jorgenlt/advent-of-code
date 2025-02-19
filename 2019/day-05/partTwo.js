import { readFile } from "fs/promises";

// A position in memory is called an address (for example, the first value in memory is at "address 0").
// Instruction: Opcodes (like 1, 2, or 99) mark the beginning of an instruction.
// Parameters: The values used immediately after an opcode, if any, are called the instruction's parameters.

const runIntcodeProgram = (program) => {
  let i = 0;

  const getParameterValue = (paramIndex, modes) => {
    return modes[paramIndex - 1]
      ? program[i + paramIndex]
      : program[program[i + paramIndex]];
  };

  while (i < program.length) {
    const opcode = program[i] % 100;
    const modes = Math.floor(program[i] / 100)
      .toString()
      .split("")
      .reverse()
      .map(Number);

    switch (opcode) {
      case 1:
        program[program[i + 3]] =
          getParameterValue(1, modes) + getParameterValue(2, modes);
        i += 4;
        break;
      case 2:
        program[program[i + 3]] =
          getParameterValue(1, modes) * getParameterValue(2, modes);
        i += 4;
        break;
      case 3:
        program[program[i + 1]] = 5;
        i += 2;
        break;
      case 4:
        console.log(getParameterValue(1, modes));
        i += 2;
        break;
      case 5:
        if (getParameterValue(1, modes) !== 0) {
          i = getParameterValue(2, modes);
        } else {
          i += 3;
        }
        break;
      case 6:
        if (getParameterValue(1, modes) === 0) {
          i = getParameterValue(2, modes);
        } else {
          i += 3;
        }
        break;
      case 7:
        program[program[i + 3]] =
          getParameterValue(1, modes) < getParameterValue(2, modes) ? 1 : 0;
        i += 4;
        break;
      case 8:
        program[program[i + 3]] =
          getParameterValue(1, modes) === getParameterValue(2, modes) ? 1 : 0;
        i += 4;
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
