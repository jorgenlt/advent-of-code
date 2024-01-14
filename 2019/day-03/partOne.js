import { readFile } from "fs/promises";
import manhattanDistance from "../../utils/manhattanDistance.js";
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

    const wire1 = input[0];
    const wire2 = input[1];

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

    // Delete coords [0, 0]
    wire1Coords.delete("0,0");
    wire2Coords.delete("0,0");

    // Find all coordinates where the wire's cross
    const intersections = [];

    [...wire1Coords.values()].forEach((coord) => {
      if (wire2Coords.has(coord)) {
        intersections.push(coord);
      }
    });

    // Find all the shortest paths from the coords to the central port
    const shortestPaths = [];

    intersections.forEach((intersection) => {
      shortestPaths.push(manhattanDistance(start, intersection.split(",")));
    });

    console.log(Math.min(...shortestPaths));
  } catch (err) {
    console.error(err);
  }
};

main();
