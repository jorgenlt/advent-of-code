import { readFile } from "fs/promises";

const KEYPAD = [
  [" ", " ", "1", " ", " "],
  [" ", "2", "3", "4", " "],
  ["5", "6", "7", "8", "9"],
  [" ", "A", "B", "C", " "],
  [" ", " ", "D", " ", " "],
];

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf8"))
      .trim()
      .split("\n")
      .map((e) => e.split(""));

    const code = [];

    let currentPosition = [2, 0];

    input.forEach((line) => {
      line.forEach((dir) => {
        if (
          dir === "U" &&
          currentPosition[0] > 0 &&
          KEYPAD[currentPosition[0] - 1][currentPosition[1]] != " "
        ) {
          currentPosition[0] -= 1;
        } else if (
          dir === "D" &&
          currentPosition[0] < 4 &&
          KEYPAD[currentPosition[0] + 1][currentPosition[1]] != " "
        ) {
          currentPosition[0] += 1;
        } else if (
          dir === "L" &&
          currentPosition[1] > 0 &&
          KEYPAD[currentPosition[0]][currentPosition[1] - 1] != " "
        ) {
          currentPosition[1] -= 1;
        } else if (
          dir === "R" &&
          currentPosition[1] < 4 &&
          KEYPAD[currentPosition[0]][currentPosition[1] + 1] != " "
        ) {
          currentPosition[1] += 1;
        }
      });

      code.push(KEYPAD[currentPosition[0]][currentPosition[1]]);
    });

    console.log(code.join(""));
  } catch (err) {
    console.error(err);
  }
};

main();
