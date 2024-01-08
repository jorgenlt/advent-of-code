import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    for (let i = 0; i < input.length; i++) {
      const id1 = input[i];

      for (let j = i + 1; j < input.length; j++) {
        const id2 = input[j];

        let diffCount = 0;

        for (let k = 0; k < id1.length; k++) {
          if (id1[k] !== id2[k]) {
            diffCount++;
          }
        }

        if (diffCount === 1) {
          let commonLetters = "";
          for (let l = 0; l < id1.length; l++) {
            if (id1[l] === id2[l]) {
              commonLetters += id1[l];
            }
          }

          console.log(commonLetters);
          return;
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

main();
