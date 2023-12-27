import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf8")).trim().split("\n");

    const regexVowels = /[aeiou]/g;

    const regexIllegalStrings = /(ab)|(cd)|(pq)|(xy)/g;

    let niceCount = 0;

    for (let i = 0; i < input.length; i++) {
      const str = input[i];

      if (regexIllegalStrings.test(str)) {
        continue;
      }

      const vowels = str.match(regexVowels);

      if (vowels && vowels.length >= 3) {
        let prev = null;
        for (let j = 0; j < str.length; j++) {
          if (str[j] === prev) {
            niceCount++;
            break;
          }
          prev = str[j];

          if (j === str.length - 1) {
            prev = null;
          }
        }
      }
    }

    console.log(niceCount);
  } catch (err) {
    console.error(err);
  }
};

main();
