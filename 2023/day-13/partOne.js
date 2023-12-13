import fs from "fs/promises";

const main = async () => {
  try {
    const input = await fs.readFile("test.txt", "utf8");

    const grids = input
      .trim()
      .split("\n\n")
      .map((block) => block.split("\n").map((line) => line.split("")));

    for(let i = 0; i < grids.length; i++) {
      console.log(grids[i])
    }
  } catch (err) {
    throw err;
  }
};

main();
