import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [mapSection, movesSection] = input.split("\n\n");
  const map = mapSection.split("\n").map((line) => line.split(""));
  const moves = movesSection.replace(/\n/g, "").split("");
  return { map, moves };
};

const findRobotPosition = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "@") {
        return [j, i]; // [x, y]
      }
    }
  }
};

const calculateTotalGPS = (map) => {
  let totalGPS = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O") {
        totalGPS += 100 * y + x;
      }
    }
  }
  return totalGPS;
};

const solvePuzzle = (input) => {
  const { map, moves } = parseInput(input);

  let robotPosition = findRobotPosition(map);

  const directions = {
    ">": [1, 0], // right
    v: [0, 1], // down
    "<": [-1, 0], // left
    "^": [0, -1], // up
  };

  moves.forEach((move) => {
    const [dx, dy] = directions[move];
    const [x, y] = robotPosition;
    const newX = x + dx;
    const newY = y + dy;

    const nextCell = map[newY]?.[newX];

    if (nextCell === ".") {
      map[y][x] = ".";
      map[newY][newX] = "@";
      robotPosition = [newX, newY];
    } else if (nextCell === "O") {
      let currentX = newX;
      let currentY = newY;
      const boxPositions = [];

      while (map[currentY]?.[currentX] === "O") {
        boxPositions.push([currentX, currentY]);
        currentX += dx;
        currentY += dy;
      }

      if (map[currentY]?.[currentX] === ".") {
        for (let i = boxPositions.length - 1; i >= 0; i--) {
          const [boxX, boxY] = boxPositions[i];
          map[boxY + dy][boxX + dx] = "O";
          map[boxY][boxX] = ".";
        }
        map[y][x] = ".";
        map[newY][newX] = "@";
        robotPosition = [newX, newY];
      }
    }
  });

  const totalGPS = calculateTotalGPS(map);
  console.log("totalGPS:", totalGPS);
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    solvePuzzle(input);
  } catch (err) {
    console.error(err);
  }
};

main();
