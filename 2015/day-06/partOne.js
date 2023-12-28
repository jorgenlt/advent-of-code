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

    // Populate Map with every coordinate between 0,0 to 999,999, and set them all to "off"
    for (let x = 0; x <= 999; x++) {
      for (let y = 0; y <= 999; y++) {
        lights.set(`${x},${y}`, "off");
      }
    }

    instructions.forEach((instruction) => {
      const [action, from, to] = instruction;

      const coordinates = getCoordRange(from, to);

      coordinates.forEach((coordinate) => {
        const currentStatus = lights.get(coordinate);

        switch (action) {
          case "toggle":
            lights.set(coordinate, currentStatus === "off" ? "on" : "off");
            break;
          case "turn on":
            lights.set(coordinate, "on");
            break;
          case "turn off":
            lights.set(coordinate, "off");
            break;
          default:
            console.error(`Action ${action} not found.`);
        }
      });
    });

    let onCount = 0;

    for (const value of lights.values()) {
      if (value === "on") {
        onCount++;
      }
    }

    console.log(onCount);
  } catch (err) {
    console.error(err);
  }
};

main();
