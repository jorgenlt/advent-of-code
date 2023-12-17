import fs from "fs/promises";

const main = async () => {
  try {
    const input = (await fs.readFile("test.txt", "utf-8")).trim();

    const lines = input.split("\n").map((e) => e.split("").map(Number));

    const rows = lines.length;
    const cols = lines[0].length;

    // Dynamic programming table
    const dp = new Array(rows)
      .fill(0)
      .map((e) => new Array(cols).fill(Infinity));

    // Base case
    dp[0][0] = 0;

    const directions = {
      left: "left",
      right: "right",
      up: "up",
      down: "down",
    };

    dp.forEach((row, i) => {
      row.forEach((col, j) => {
        // Check if direction is valid
      });
    });

    console.table(dp);
  } catch (err) {
    throw err;
  }
};

main();
