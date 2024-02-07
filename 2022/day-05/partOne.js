import { readFile } from "fs/promises";

// Hard coded crates from input
const CRATES = [
  ["R", "P", "C", "D", "B", "G"],
  ["H", "V", "G"],
  ["N", "S", "Q", "D", "J", "P", "M"],
  ["P", "S", "L", "G", "D", "C", "N", "M"],
  ["J", "B", "N", "C", "P", "F", "L", "S"],
  ["Q", "B", "D", "Z", "V", "G", "T", "S"],
  ["B", "Z", "M", "H", "F", "T", "Q"],
  ["C", "M", "D", "B", "F"],
  ["F", "C", "Q", "G"],
];

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).split("\n\n");

    const crates = [...CRATES];
    const procedures = input[1].split("\n").map((procedure) =>
      procedure
        .split(" ")
        .filter((e) => !isNaN(e))
        .map(Number)
    );

    procedures.forEach((procedure) => {
      const [qty, from, to] = procedure;

      for (let i = 0; i < qty; i++) {
        crates[to - 1].push(crates[from - 1].pop());
      }
    });

    const lastLetters = crates.map((arr) => arr[arr.length - 1]).join("");

    console.log(lastLetters);
  } catch (err) {
    console.error(err);
  }
};

main();
