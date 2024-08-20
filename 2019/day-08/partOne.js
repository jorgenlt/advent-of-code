import { readFile } from "fs/promises";

const createLayers = (stringNums, layerSize) => {
  const result = [];

  for (let i = 0; i < stringNums.length; i += layerSize) {
    result.push(stringNums.substring(i, i + layerSize));
  }

  return result;
};

const layersWithFewestZeros = (layers) => {
  let result;
  let zerosCount = Number.MAX_VALUE;

  layers.forEach((layer) => {
    const zerosMatches = layer.match(/0/g) || [];
    const zeros = zerosMatches.length;
    if (zeros < zerosCount) {
      result = layer;
      zerosCount = zeros;
    }
  });

  return result;
};

const calcOnesTimesTwos = (layer) => {
  const onesMatches = layer.match(/1/g) || [];
  const ones = onesMatches.length;

  const twosMatches = layer.match(/2/g) || [];
  const twos = twosMatches.length;

  return ones * twos;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const layers = createLayers(input, 25 * 6);

    console.log(calcOnesTimesTwos(layersWithFewestZeros(layers)));
  } catch (err) {
    console.error(err);
  }
};

main();
