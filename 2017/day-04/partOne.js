import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split(" "));

    // A valid passphrase must contain no duplicate words
    // How many passphrases are valid?

    let passphraseCount = 0;

    input.forEach((passphrase) => {
      const wordsInPassphrase = [];

      passphrase.forEach((word) => {
        if (wordsInPassphrase.indexOf(word) === -1) {
          wordsInPassphrase.push(word);
        }
      });

      if (passphrase.join() === wordsInPassphrase.join()) {
        passphraseCount++;
      }
    });

    console.log(passphraseCount);
  } catch (err) {
    console.error(err);
  }
};

main();
