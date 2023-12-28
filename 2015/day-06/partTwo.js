import { readFile } from "fs/promises";
import getCoordRange from "../../utils/getCoordRange.js";

const removeNonDigitsAndCommas = (str) => {
  return str.replace(/[^\d,]/g, "");
};

const parsingInstructions = (input) => {
  const instructions = input.split("\n").map((e) => {
    const [action, from, to] = e
      .match(/(toggle|turn on|turn off) (\d+,\d+) through (\d+,\d+)/)
      .slice(1);
    return [
      action,
      removeNonDigitsAndCommas(from),
      removeNonDigitsAndCommas(to),
    ];
  });
  return instructions;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf8")).trim();

    const instructions = parsingInstructions(input);

    const lights = new Map();

    // Populate Map with every coordinate between 0,0 to 999,999, and set them all to 0
    for (let x = 0; x <= 999; x++) {
      for (let y = 0; y <= 999; y++) {
        lights.set(`${x},${y}`, 0);
      }
    }

    instructions.forEach((instruction) => {
      const [action, from, to] = instruction;

      const coordinates = getCoordRange(from, to);

      coordinates.forEach((coordinate) => {
        const currentBrightness = lights.get(coordinate);

        switch (action) {
          case "toggle":
            lights.set(coordinate, currentBrightness + 2);
            break;
          case "turn on":
            lights.set(coordinate, currentBrightness + 1);
            break;
          case "turn off":
            lights.set(coordinate, Math.max(0, currentBrightness - 1));
            break;
          default:
            console.error(`Action ${action} not found.`);
        }
      });
    });

    let totalBrightness = 0;

    for (const value of lights.values()) {
      totalBrightness += value;
    }

    console.log(totalBrightness);
  } catch (err) {
    console.error(err);
  }
};

main();
