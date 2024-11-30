
import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(input);
  } catch (err) {
    console.error(err);
  }
};

main();
