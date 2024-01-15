import { readFile } from "fs/promises";
import getCoordRange from "../../utils/getCoordRange.js";

const MOVEMENT = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => e.split(",").map((f) => [f[0], Number(f.slice(1))]));

    const [wire1, wire2] = input;

    // Starting coordinates
    const start = [0, 0];

    // Save coords in set as strings [x,y].join()
    const wire1Coords = new Set();
    const wire2Coords = new Set();

    let currentWire1 = start;
    let currentWire2 = start;

    // wire1
    wire1.forEach((instruction) => {
      const movement = MOVEMENT[instruction[0]];
      const length = instruction[1];

      const [cx, cy] = currentWire1;
      const [mx, my] = movement;

      const newCoords = [cx + mx * length, cy + my * length];

      const coordsRange = getCoordRange(currentWire1.join(), newCoords.join());

      coordsRange.forEach((coord) => {
        wire1Coords.add(coord);
      });

      currentWire1 = newCoords;
    });

    // wire2
    wire2.forEach((instruction) => {
      const movement = MOVEMENT[instruction[0]];
      const length = instruction[1];

      const [cx, cy] = currentWire2;
      const [mx, my] = movement;

      const newCoords = [cx + mx * length, cy + my * length];

      const coordsRange = getCoordRange(currentWire2.join(), newCoords.join());

      coordsRange.forEach((coord) => {
        wire2Coords.add(coord);
      });

      currentWire2 = newCoords;
    });

    // Find all coordinates where the wire's cross
    const intersections = [];

    [...wire1Coords.values()].forEach((coord) => {
      if (wire2Coords.has(coord)) {
        intersections.push(coord);
      }
    });

    const wire1Array = [...wire1Coords];
    const wire2Array = [...wire2Coords];

    // To save number of steps to intersection
    const steps = [];

    // For every intersection find the combined number of steps each wire takes
    intersections.forEach((intersection) => {
      // Find index of intersection (number of steps)
      const indexWire1 = wire1Array.indexOf(intersection);
      const indexWire2 = wire2Array.indexOf(intersection);

      // Combine and save
      steps.push(indexWire1 + indexWire2);
    });

    // Remove 0 steps if it exists
    if (steps.indexOf(0) > -1) {
      steps.splice(steps.indexOf(0), 1);
    }

    // Find min combined steps
    const answer = Math.min(...steps);

    console.log("Answer:", answer);
  } catch (err) {
    console.error(err);
  }
};

main();
