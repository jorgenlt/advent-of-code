import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [section1, section2] = input.split("\n\n\n");

  return section1.split("\n\n").map((sample) => {
    const obj = {};

    sample.split("\n").forEach((l) => {
      if (/Before/.test(l)) {
        obj.before = l.match(/\d+/g).map(Number);
      } else if (/After/.test(l)) {
        obj.after = l.match(/\d+/g).map(Number);
      } else {
        obj.instruction = l.match(/\d+/g).map(Number);
      }
    });
    return obj;
  });
};

const opcodes = {
  addr: (reg, A, B, C) => {
    reg[C] = reg[A] + reg[B];
  },
  addi: (reg, A, B, C) => {
    reg[C] = reg[A] + B;
  },
  mulr: (reg, A, B, C) => {
    reg[C] = reg[A] * reg[B];
  },
  muli: (reg, A, B, C) => {
    reg[C] = reg[A] * B;
  },
  banr: (reg, A, B, C) => {
    reg[C] = reg[A] & reg[B];
  },
  bani: (reg, A, B, C) => {
    reg[C] = reg[A] & B;
  },
  borr: (reg, A, B, C) => {
    reg[C] = reg[A] | reg[B];
  },
  bori: (reg, A, B, C) => {
    reg[C] = reg[A] | B;
  },
  setr: (reg, A, B, C) => {
    reg[C] = reg[A];
  },
  seti: (reg, A, B, C) => {
    reg[C] = A;
  },
  gtir: (regs, A, B, C) => {
    regs[C] = A > regs[B] ? 1 : 0;
  },
  gtri: (regs, A, B, C) => {
    regs[C] = regs[A] > B ? 1 : 0;
  },
  gtrr: (regs, A, B, C) => {
    regs[C] = regs[A] > regs[B] ? 1 : 0;
  },
  eqir: (regs, A, B, C) => {
    regs[C] = A === regs[B] ? 1 : 0;
  },
  eqri: (regs, A, B, C) => {
    regs[C] = regs[A] === B ? 1 : 0;
  },
  eqrr: (regs, A, B, C) => {
    regs[C] = regs[A] === regs[B] ? 1 : 0;
  },
};

const solvePuzzle = (input) => {
  const samples = parseInput(input);

  let threeOrMoreMatchingOpcodes = 0;

  for (const sample of samples) {
    let matchingOpcodes = 0;

    for (const [name, action] of Object.entries(opcodes)) {
      const before = [...sample.before];
      const [opcode, A, B, C] = sample.instruction;
      action(before, A, B, C);

      if (before.join("") === sample.after.join("")) {
        matchingOpcodes++;
      }
    }

    if (matchingOpcodes >= 3) {
      threeOrMoreMatchingOpcodes++;
    }
  }

  return threeOrMoreMatchingOpcodes;
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
