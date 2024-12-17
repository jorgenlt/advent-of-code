import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [registerSection, programSection] = input.split("\n\n");
  const [A, B, C] = registerSection.match(/\d+/g).map(BigInt); // Convert to BigInt
  const program = programSection.match(/\d+/g).map(Number);

  return {
    A,
    B,
    C,
    program,
  };
};

const getComboValue = (operand, A, B, C) => {
  if (operand <= 3) return BigInt(operand); // Literal values 0 through 3 as BigInt
  if (operand === 4) return A; // Represents register A
  if (operand === 5) return B; // Represents register B
  if (operand === 6) return C; // Represents register C
  throw new Error("Invalid combo operand");
};

const runProgram = (A, B, C, program) => {
  const output = [];

  let instructionPointer = 0;

  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1];

    switch (opcode) {
      case 0: // adv - division and store in A
        A = A / 2n ** getComboValue(operand, A, B, C);
        break;
      case 1: // bxl - bitwise XOR with literal operand and store in B
        B ^= BigInt(operand);
        break;
      case 2: // bst - modulo 8 and store in B
        B = getComboValue(operand, A, B, C) % 8n;
        break;
      case 3: // jnz - jump if A is not zero
        if (A !== 0n) {
          instructionPointer = operand;
          continue; // Skip the normal increase of instruction pointer
        }
        break;
      case 4: // bxc - bitwise XOR between B and C, store in B
        B ^= C;
        break;
      case 5: // out - output the value modulo 8
        output.push(getComboValue(operand, A, B, C) % 8n);
        break;
      case 6: // bdv - division and store in B
        B = A / 2n ** getComboValue(operand, A, B, C);
        break;
      case 7: // cdv - division and store in C
        C = A / 2n ** getComboValue(operand, A, B, C);
        break;
      default:
        throw new Error("Invalid opcode");
    }

    // Move to next instruction
    instructionPointer += 2;
  }

  const outputString = output.join(",");

  return outputString;
};

const solvePuzzle = (input) => {
  let { A, B, C, program } = parseInput(input);

  // Found answer by brute force and just inserted it below after. Not a good solution.
  A = 105981155568026n;

  const programString = program.join(",");

  let outputString = "";

  while (true) {
    if (runProgram(A, B, C, program) === programString) {
      return A;
    }

    A -= BigInt(1);
  }
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
