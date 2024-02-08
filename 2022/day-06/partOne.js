import { readFile } from "fs/promises";

const areAllItemsUnique = (arr) => {
  return arr.length === new Set(arr).size;
};

const main = async () => {
  try {
    const buffer = (await readFile("input.txt", "utf-8")).trim().split("");

    for (let i = 3; i < buffer.length; i++) {
      const chars = buffer.slice(i - 3, i + 1);

      if (areAllItemsUnique(chars)) {
        console.log(i + 1);
        return;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

main();
