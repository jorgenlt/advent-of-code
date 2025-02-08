import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split(",");
};

const spin = (programs, danceMove) => {
  const iterations = Number(danceMove.match(/\d+/)[0]);

  for (let i = 0; i < iterations; i++) {
    const lastElement = programs.pop();
    programs.unshift(lastElement);
  }

  return programs;
};

const exchange = (programs, danceMove) => {
  const [indexA, indexB] = danceMove.match(/\d+/g).map(Number);

  const temp = programs[indexB];

  programs[indexB] = programs[indexA];
  programs[indexA] = temp;

  return programs;
};

const partner = (programs, danceMove) => {
  const [_, programA, programB] = danceMove.match(/[a-z]/g);

  const indexA = programs.indexOf(programA);
  const indexB = programs.indexOf(programB);

  const temp = programs[indexB];

  programs[indexB] = programs[indexA];
  programs[indexA] = temp;

  return programs;
};

const solvePuzzle = (input) => {
  let programs = "abcdefghijklmnop".split("");

  parseInput(input).forEach((danceMove) => {
    const moveType = danceMove[0];

    switch (moveType) {
      case "s":
        programs = spin(programs, danceMove);
        break;
      case "x":
        programs = exchange(programs, danceMove);
        break;
      case "p":
        programs = partner(programs, danceMove);
        break;
      default:
        break;
    }
  });

  return programs.join("");
};
const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
