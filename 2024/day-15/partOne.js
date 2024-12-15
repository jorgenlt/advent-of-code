import { readFile } from "fs/promises";

/*



*/

const parseInput = (input) => {
  const [mapSection, movesSection] = input.split("\n\n");
  const map = mapSection.split("\n").map((line) => line.split(""));
  const moves = movesSection.replace(/\n/g, "").split("");
  return { map, moves };
};

const printMap = (map) => map.forEach((l) => console.log(l.join("")));

const findRobotPosition = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "@") {
        return [j, i];
      }
    }
  }
};

const performMove = (map, move, robotPos) => {
  const directions = {
    ">": [0, 1],
    v: [1, 0],
    "<": [0, -1],
    "^": [-1, 0],
  };

  
};

const calculateTotalBoxGPS = (map) => {
  console.log("calculateTotalBoxGPS(map)");
};

const solvePuzzle = (input) => {
  const { map, moves } = parseInput(input);

  printMap(map);

  moves.forEach((move) => {
    const robotPosition = findRobotPosition(map)
    
    performMove(map, move, robotPosition);
  });

  calculateTotalBoxGPS(map);
};

const main = async () => {
  try {
    const input = (await readFile("test.txt", "utf-8")).trim();

    solvePuzzle(input);
  } catch (err) {
    console.error(err);
  }
};

main();
