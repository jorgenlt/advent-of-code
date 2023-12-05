import { readFile } from "../utils/readFile.js";

const main = async () => {
  try {
    const lines = (await readFile("input.csv")).trim().split("\n");

  } catch (err) {
    console.error(err);
  }
};

main();
