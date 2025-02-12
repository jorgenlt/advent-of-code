import { readFile } from "fs/promises";
import shiftArrayLeft from "../../utils/shiftArrayLeft.js";
import shiftArrayRight from "../../utils/shiftArrayRight.js";

const parseInput = (input) => {
  return input.split("\n");
};

const swapPosition = (password, x, y) => {
  [password[x], password[y]] = [password[y], password[x]];
  return password;
};

const swapLetter = (password, x, y) => {
  return swapPosition(password, password.indexOf(x), password.indexOf(y));
};

const rotateLeftRight = (password, direction, steps) => {
  if (direction === "left") {
    return shiftArrayLeft(password, steps);
  }
  if (direction === "right") {
    return shiftArrayRight(password, steps);
  }
};

const rotatePosLetter = (password, letter) => {
  const index = password.indexOf(letter);
  password = shiftArrayRight(password, 1);
  password = shiftArrayRight(password, index);
  if (index >= 4) {
    password = shiftArrayRight(password, 1);
  }

  return password;
};

const reversePositions = (password, x, y) => {
  const reversed = password.slice(x, y + 1).reverse();

  password.splice(x, y - x + 1, reversed);

  return password.flat();
};

const movePositions = (password, x, y) => {
  const temp = password.splice(x, 1);

  password.splice(y, 0, temp);

  return password.flat();
};

const solvePuzzle = (input, password) => {
  const instructions = parseInput(input);

  let scrambled = password.split("");

  instructions.forEach((instruction) => {
    if (/swap position/.test(instruction)) {
      const [x, y] = instruction.match(/\d+/g).map(Number);
      scrambled = swapPosition(scrambled, x, y);
    }

    if (/swap letter/.test(instruction)) {
      const regex = /^swap letter ([a-z]) with letter ([a-z])$/i;
      const [_, x, y] = instruction.match(regex);

      scrambled = swapLetter(scrambled, x, y);
    }

    if (/rotate [left|right]/.test(instruction)) {
      const direction = instruction.split(" ")[1];
      const [steps] = instruction.match(/\d+/).map(Number);

      scrambled = rotateLeftRight(scrambled, direction, steps);
    }

    if (/rotate based/.test(instruction)) {
      const letter = instruction[instruction.length - 1];

      scrambled = rotatePosLetter(scrambled, letter);
    }

    if (/reverse positions/.test(instruction)) {
      const [x, y] = instruction.match(/\d+/g).map(Number);

      scrambled = reversePositions(scrambled, x, y);
    }

    if (/move position/.test(instruction)) {
      const [x, y] = instruction.match(/\d+/g).map(Number);

      scrambled = movePositions(scrambled, x, y);
    }
  });

  return scrambled.join("");
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();
    const password = "abcdefgh";

    console.log(solvePuzzle(input, password));
  } catch (err) {
    console.error(err);
  }
};

main();
