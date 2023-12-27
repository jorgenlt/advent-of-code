import { readFile } from "fs/promises";
import getCoordRange from "../../utils/getCoordRange.js";

const removeNonDigitsAndCommas = (str) => {
  return str.replace(/[^\d,]/g, "");
};

const parsingIntructions = (input) => {
  const instructions = [];

  input.split("\n").forEach((e) => {
    const instruction = [];

    const action = e.split(/\d/g)[0].replace("turn", "").trim();
    instruction.push(action);

    e.split("through").forEach((f) => {
      instruction.push(removeNonDigitsAndCommas(f));
    });

    instructions.push(instruction);
  });

  return instructions;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf8")).trim();

    const instructions = parsingIntructions(input);

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

        if (action === "toggle") {
          lights.set(coordinate, currentStatus === "off" ? "on" : "off");
        } else {
          lights.set(coordinate, action);
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
