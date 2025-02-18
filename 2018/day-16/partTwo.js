import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [section1, section2] = input.split("\n\n\n");

  const samples = section1.split("\n\n").map((sample) => {
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

  const program = section2
    .trim()
    .split("\n")
    .map((l) => l.split(" ").map(Number));

  return { samples, program };
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

const getOpcodesRegister = (samples) => {
  const allOpNames = Object.keys(opcodes);

  const candidates = new Map();

  for (let i = 0; i < 16; i++) {
    candidates.set(i, new Set(allOpNames));
  }

  for (const sample of samples) {
    const [opcodeNum, A, B, C] = sample.instruction;
    const possible = new Set();

    // For each opcode, test if it produces the correct result
    for (const [name, action] of Object.entries(opcodes)) {
      const regs = [...sample.before];
      action(regs, A, B, C);
      if (regs.join(",") === sample.after.join(",")) {
        possible.add(name);
      }
    }

    // Intersect the current candidate set with the ones that worked for this sample
    const currentCandidates = candidates.get(opcodeNum);
    const newCandidates = new Set(
      [...currentCandidates].filter((name) => possible.has(name))
    );
    candidates.set(opcodeNum, newCandidates);
  }

  // Elimination to find a unique mapping
  const opcodesRegister = new Map();

  let progress = true;

  while (progress) {
    progress = false;

    // Looking for opcode numbers with only one candidate
    for (const [opcodeNum, names] of candidates) {
      if (names.size === 1) {
        const determined = [...names][0];

        // Only add if not already determined
        if (!opcodesRegister.has(opcodeNum)) {
          opcodesRegister.set(opcodeNum, determined);
          progress = true;

          // Remove this opcode name from all other candidate sets
          for (const [otherOpcode, otherNames] of candidates) {
            if (otherOpcode !== opcodeNum && otherNames.has(determined)) {
              otherNames.delete(determined);
            }
          }
        }
      }
    }
  }

  return opcodesRegister;
};

const solvePuzzle = (input) => {
  const { samples, program } = parseInput(input);

  const opcodesRegister = getOpcodesRegister(samples);

  const register = [0, 0, 0, 0];

  for (const instruction of program) {
    const [opcodeNum, A, B, C] = instruction;

    opcodes[opcodesRegister.get(opcodeNum)](register, A, B, C);
  }

  return register[0];
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
