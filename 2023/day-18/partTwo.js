import fs from "fs/promises";

// Function to caluclate area of the polygon
// using the shoelace formula.
// https://www.themathdoctors.org/polygon-coordinates-and-areas/
const polygonArea = (X, Y, n) => {
  let area = 0.0;

  // Calculate value of shoelace formula
  let j = n - 1;
  for (let i = 0; i < n; i++) {
    area += (X[j] + X[i]) * (Y[j] - Y[i]);

    // j is previous vertex to i
    j = i;
  }

  // Return absolute value
  return Math.abs(area / 2.0);
};

const move = (direction, steps) => {
  switch (direction) {
    case "0":
      // Right
      return { x: steps, y: 0 };
    case "2":
      // Left
      return { x: -steps, y: 0 };
    case "3":
      // Up
      return { x: 0, y: steps };
    case "1":
      // Down
      return { x: 0, y: -steps };
    default:
      console.error("Not a direction.");
  }
};

const main = async () => {
  const input = (await fs.readFile("input.txt", "utf8")).trim();

  const lines = input
    .split("\n")
    .map((line) => line.split(" ").map((e) => (!isNaN(e) ? Number(e) : e)));

  const x = [0];
  const y = [0];

  let perimeter = 0;

  lines.forEach((line) => {
    let [direction, steps, color] = line;

    // Converting first 5 hexidecimal digits
    steps = parseInt(color.slice(2, -2), 16);

    // Deciding direction based on last digit in hexidecimal code
    direction = color.slice(-2).slice(0, -1);

    const { x: dx, y: dy } = move(direction, steps);

    x.at(-1) ? x.push(x.at(-1) + dx) : x.push(dx);
    y.at(-1) ? y.push(y.at(-1) + dy) : y.push(dy);

    perimeter += steps;
  });

  x.push(0);
  y.push(0);

  const n = x.length;

  const area = polygonArea(x, y, n);

  const result = area + perimeter / 2 + 1;

  console.log(result);
};

main();
