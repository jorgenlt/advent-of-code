import fs from "fs/promises";

const hashAlgorithm = (str) => {
  let currentValue = 0;

  str.split("").forEach((char) => {
    const ascii = char.charCodeAt(0);

    currentValue += ascii;
    currentValue *= 17;
    currentValue %= 256;
  });

  return currentValue;
};

const main = async () => {
  const input = (await fs.readFile("input.txt", "utf8")).trim();
  const list = input.split(",");

  const boxes = new Array(256).fill().map(() => []);

  list.forEach((item) => {
    if (item.slice(-1) === "-") {
      const [label] = item.split("-");
      const hash = hashAlgorithm(label);
      boxes[hash] = boxes[hash].filter((e) => e[0] !== label);
    } else {
      const label = item.split("=")[0];
      const focal = item.split("=")[1];
      const hash = hashAlgorithm(label);
      const box = boxes[hash];
      const original = box.find((e) => e[0] === label);

      if (original !== undefined) {
        const index = box.indexOf(original);
        box[index] = [label, parseInt(focal)];
      } else {
        box.push([label, parseInt(focal)]);
      }
    }
  });

  let total = 0;

  boxes.forEach((box, i) => {
    box.forEach((e, j) => {
      total += (i + 1) * (j + 1) * e[1];
    });
  });

  console.log(total);
  return total;
};

main();
