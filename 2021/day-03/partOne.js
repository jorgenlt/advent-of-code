import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    const gamma = [];
    const epsilon = [];

    for (let i = 0; i < input[0].length; i++) {
      const bit = input[0][i];

      let bit0 = bit === "0" ? 1 : 0;
      let bit1 = bit === "1" ? 1 : 0;

      for (let j = 1; j < input.length; j++) {
        const bin = input[j];

        bin[i] === "0" ? bit0++ : bit1++;
      }

      gamma.push(bit0 > bit1 ? 0 : 1);
      epsilon.push(bit0 > bit1 ? 1 : 0);
    }

    const gammaDecimal = parseInt(Number(gamma.join("")), 2);
    const epsilonDecimal = parseInt(Number(epsilon.join("")), 2);

    console.log(gammaDecimal * epsilonDecimal);
  } catch (err) {
    console.error(err);
  }
};

main();
