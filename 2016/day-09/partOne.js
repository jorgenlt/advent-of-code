import { readFile } from "fs/promises";

const main = async () => {
  try {
    const compressed = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n");

    const decompressed = [];

    for (let i = 0; i < compressed.length; i++) {
      let line = compressed[i];
      let newLine = "";
      const regex = /(\(\d+x\d+\))/;

      while (line.length !== 0) {
        const matches = regex.exec(line);

        if (matches) {
          const indexStart = matches.index;
          const indexEnd = indexStart + matches[0].length - 1;
          const numOfChars = parseInt(
            matches[0].split("x")[0].replace("(", "")
          );
          const repeats = parseInt(matches[0].split("x")[1]);

          const compressedPart = line.slice(
            indexEnd + 1,
            indexEnd + numOfChars + 1
          );

          const decompressedPart = compressedPart.repeat(repeats);

          newLine += line.slice(0, indexStart) + decompressedPart;

          line = line.slice(indexEnd + 1 + numOfChars);
        } else {
          newLine += line;
          line = "";
        }
      }

      decompressed.push(newLine);
    }

    console.log(decompressed.join("").length);
  } catch (err) {
    console.error(err);
  }
};

main();
