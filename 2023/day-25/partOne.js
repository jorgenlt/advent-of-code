import fs from "fs/promises";

const main = async () => {
  try {
    const input = (await fs.readFile("test.txt", "utf8")).trim();

    console.log(input);
  } catch (err) {
    console.error(err);
  }
};
