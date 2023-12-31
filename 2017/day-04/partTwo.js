import { readFile } from "fs/promises";
import isAnagram from "../../utils/isAnagram.js";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split(" "));

    let passphraseCount = 0;

    for (let i = 0; i < input.length; i++) {
      const passphrase = input[i];

      let isValid = true;

      // Compare each word in the passphrase with every other word
      for (let j = 0; j < passphrase.length - 1; j++) {
        for (let k = j + 1; k < passphrase.length; k++) {
          // Check if the current pair of words are anagrams
          // If an anagram is found, set isValid to false and break out of the loop
          if (isAnagram(passphrase[j], passphrase[k])) {
            isValid = false;
            break;
          }
        }
        // If an anagram is found, break out of the outer loop as well
        if (!isValid) {
          break;
        }
      }

      // If no anagrams were found, increment the passphrase count
      if (isValid) {
        passphraseCount++;
      }
    }

    console.log(passphraseCount);
  } catch (err) {
    console.error(err);
  }
};

main();
