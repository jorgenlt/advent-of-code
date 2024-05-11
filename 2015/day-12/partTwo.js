import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const regex = /-?\d+/g;

    const parsedJson = JSON.parse(input, (key, value) => {
      if (!Array.isArray(value)) {
        if (Object.values(value).includes("red")) {
          return {};
        } else {
          return value;
        }
      }

      return value;
    });

    const allNumbers = JSON.stringify(parsedJson).matchAll(regex);

    let sum = 0;

    for (const match of allNumbers) {
      sum += Number(match[0]);
    }

    console.log(sum);
  } catch (err) {
    console.error(err);
  }
};

main();
