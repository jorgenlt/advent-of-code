import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    console.time();
    const input = (await readLines("test.txt")).map((e) =>
      e.split(" ").map((stringNum) => parseInt(stringNum))
    );

    const extrapolatedValues = [];

    for (let i = 0; i < input.length; i++) {
      const history = input[i];

    }

    // console.log(input);


    console.timeEnd();
  } catch (err) {
    throw err;
  }
};

main();
