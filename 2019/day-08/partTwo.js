import { readFile } from "fs/promises";

const createLayers = (stringNums, width, height) => {
  const x = width;
  const y = height;

  const result = [];

  for (let i = 0; i < stringNums.length; i += x * y) {
    const layer = [];

    const layerStr = stringNums.substring(i, i + x * y);

    for (let j = 0; j < layerStr.length; j += x) {
      layer.push(layerStr.substring(j, j + x));
    }

    result.push(layer);
  }

  return result;
};

const createArrayOfTwos = (x, y) => {
  const result = [];

  for (let i = 0; i < y; i++) {
    const row = [];

    for (let j = 0; j < x; j++) {
      row.push("2");
    }

    result.push(row);
  }

  return result;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const layers = createLayers(input, 25, 6);
    console.log("🚀 ~ main ~ layers:", layers);

    const result = createArrayOfTwos(25, 6);

    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];

      for (let j = 0; j < layer.length; j++) {
        const row = layer[j];

        for (let k = 0; k < row.length; k++) {
          const currentX = k;
          const currentY = j;

          const value = row[k];
          const valueCurrentPosition = result[currentY][currentX];

          if (value !== "2" && valueCurrentPosition === "2") {
            result[currentY][currentX] = value === "0" ? "⚫" : "⚪";
          }
        }
      }
    }

    // Print the decoded image
    for (let row of result) {
      console.log(row.join(" "));
    }
  } catch (err) {
    console.error(err);
  }
};

main();
