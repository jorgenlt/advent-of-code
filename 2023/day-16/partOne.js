import fs from "fs/promises";

const main = async () => {
  try {
    const input = fs.readFile("test.txt", "utf8");

    console.log(input);
  } catch (err) {
    throw err;
  }
};

main();
