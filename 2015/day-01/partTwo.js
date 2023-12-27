import fs from "fs/promises";

const main = async () => {
  try {
    const input = (await fs.readFile("input.txt", "utf8")).trim().split("");

    let floor = 0;
    let position;

    for (let i = 0; i < input.length; i++) {
      input[i] === "(" ? floor++ : floor--;
      if (floor === -1) {
        position = i + 1;
        break;
      }
    }

    console.log(position);
  } catch (err) {
    console.error(err);
  }
};

main();
