import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n");
};

const getValue = (x, registers) => {
  return isNaN(x) ? registers[x] || 0 : Number(x);
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);

  const createProgram = (id) => {
    return {
      id,
      registers: { p: id },
      pc: 0,
      queue: [],
      terminated: false,
      sendCount: 0,
    };
  };

  const program0 = createProgram(0);
  const program1 = createProgram(1);

  const step = (program, otherProgram) => {
    if (program.terminated) return false;

    if (program.pc < 0 || program.pc >= instructions.length) {
      program.terminated = true;
      return false;
    }

    const [op, x, y] = instructions[program.pc].split(" ");

    switch (op) {
      case "snd": {
        const value = getValue(x, program.registers);
        otherProgram.queue.push(value);

        if (program.id === 1) program.sendCount++;
        program.pc++;
        return true;
      }
      case "set": {
        program.registers[x] = getValue(y, program.registers);
        program.pc++;
        return true;
      }
      case "add": {
        program.registers[x] =
          getValue(x, program.registers) + getValue(y, program.registers);
        program.pc++;
        return true;
      }
      case "mul": {
        program.registers[x] =
          getValue(x, program.registers) * getValue(y, program.registers);
        program.pc++;
        return true;
      }
      case "mod": {
        program.registers[x] =
          getValue(x, program.registers) % getValue(y, program.registers);
        program.pc++;
        return true;
      }
      case "rcv": {
        if (program.queue.length === 0) return false;

        const received = program.queue.shift();
        program.registers[x] = received;
        program.pc++;
        return true;
      }
      case "jgz": {
        if (getValue(x, program.registers) > 0) {
          program.pc += getValue(y, program.registers);
        } else {
          program.pc++;
        }
        return true;
      }
      default:
        program.pc++;
        return true;
    }
  };

  while (true) {
    const p0Progress = step(program0, program1);
    const p1Progress = step(program1, program0);

    if (!p0Progress && !p1Progress) break;
  }

  return program1.sendCount;
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
