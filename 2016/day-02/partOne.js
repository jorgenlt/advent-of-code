import { readFile } from "fs/promises";

const KEYPAD = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf8"))
      .trim()
      .split("\n")
      .map((e) => e.split(""));

    const code = [];

    let currentPosition = [1, 1];

    input.forEach((line) => {
      line.forEach((dir) => {
        if (dir === "U" && currentPosition[0] > 0) {
          currentPosition[0] -= 1;
        } else if (dir === "D" && currentPosition[0] < 2) {
          currentPosition[0] += 1;
        } else if (dir === "L" && currentPosition[1] > 0) {
          currentPosition[1] -= 1;
        } else if (dir === "R" && currentPosition[1] < 2) {
          currentPosition[1] += 1
        }
      });

      code.push(KEYPAD[currentPosition[0]][currentPosition[1]]);
    });
    
    console.log(Number(code.join("")));
  } catch (err) {
    console.error(err);
  }
};

main();
