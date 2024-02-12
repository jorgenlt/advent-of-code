import { readFile } from "fs/promises";
import transposeMatrix from "../../utils/transposeMatrix.js";

const createScreen = () => {
  return Array.from({ length: 6 }, () => Array(50).fill("."));
};

const shiftArray = (arr, steps) => {
  const offset = steps % arr.length;
  return [...arr.slice(-offset), ...arr.slice(0, -offset)];
};

const main = async () => {
  try {
    const instructions = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n");

    let screen = createScreen();

    instructions.forEach((instruction) => {
      const [action, ...params] = instruction.split(" ");

      if (action === "rect") {
        const [rectX, rectY] = params[0].split("x").map(Number);

        for (let i = 0; i < rectY; i++) {
          for (let j = 0; j < rectX; j++) {
            screen[i][j] = "#";
          }
        }
      }

      if (action === "rotate") {
        if (params[0] === "row") {
          const y = Number(params[1][2]);
          const steps = Number(params[3]);

          screen[y] = shiftArray(screen[y], steps);
        } else {
          // col
          const x = Number(params[1].split("").slice(2).join(""));
          const steps = Number(params[3]);

          const transposed = transposeMatrix(screen);

          const col = [...transposed][x];

          const shiftedCol = shiftArray(col, steps);

          transposed[x] = shiftedCol;

          // Transpose back and update
          screen = transposeMatrix(transposed);
        }
      }
    });

    let pixelCount = 0;

    screen.forEach((line) => {
      pixelCount += line.filter((pixel) => pixel === "#").length;
    });

    // Part 1
    console.log("Part 1:", pixelCount);

    // Part 2 - Log and read the screen
    console.log(
      "Part 2:",
      screen.map((e) => e.join(""))
    );
  } catch (err) {
    console.error(err);
  }
};

main();
