import { readFile } from "fs/promises";

const decompressedLength = (str) => {
  let length = 0;
  let i = 0;

  while (i < str.length) {
    if (str[i] === "(") {
      // Found a marker
      const markerEnd = str.indexOf(")", i);
      const marker = str.slice(i + 1, markerEnd);
      const [repeatLength, repeatCount] = marker.split("x").map(Number);

      // Recursive call to get the length of the decompressed data within the marker
      const nestedLength = decompressedLength(
        str.slice(markerEnd + 1, markerEnd + 1 + repeatLength)
      );

      // Update the total length
      length += repeatCount * nestedLength;

      // Move the index past the marker and decompressed data
      i = markerEnd + 1 + repeatLength;
    } else {
      // Regular character, increment length
      length++;
      i++;
    }
  }

  return length;
};

const main = async () => {
  try {
    const compressed = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n");

    let length = 0;

    compressed.forEach((line) => {
      length += decompressedLength(line);
    });

    console.log(length);
  } catch (err) {
    console.error(err);
  }
};

main();
