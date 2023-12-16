import fs from "fs/promises";

// Function to get the possible next directions based on the current
// character and direction
const getNextDirections = (currentChar, direction) => {
  if (!currentChar) {
    return [];
  }
  const directionMap = new Map([
    [
      ".",
      {
        right: ["right"],
        left: ["left"],
        up: ["up"],
        down: ["down"],
      },
    ],
    [
      "|",
      {
        right: ["up", "down"],
        left: ["up", "down"],
        up: ["up"],
        down: ["down"],
      },
    ],
    [
      "-",
      {
        right: ["right"],
        left: ["left"],
        up: ["right", "left"],
        down: ["right", "left"],
      },
    ],
    [
      "/",
      {
        right: ["up"],
        left: ["down"],
        up: ["right"],
        down: ["left"],
      },
    ],
    [
      "\\",
      {
        right: ["down"],
        left: ["up"],
        up: ["left"],
        down: ["right"],
      },
    ],
  ]);
  return directionMap.get(currentChar)[direction];
};

// Function to move the position based on the given direction
const movePosition = (position, direction) => {
  const newPosition = { ...position };

  const directions = {
    right: () => {
      newPosition.column += 1;
    },
    left: () => {
      newPosition.column -= 1;
    },
    up: () => {
      newPosition.row -= 1;
    },
    down: () => {
      newPosition.row += 1;
    },
  };

  if (directions[direction]) {
    directions[direction]();
  }

  return newPosition;
};

const energizedTiles = (lines, initialPosition) => {
  // Initialize the beams array with the first position
  let beams = [initialPosition];

  // Create a Set to keep track of visited positions
  const visited = new Set();

  // Loop until all beams have been processed
  while (beams.length !== 0) {
    // Create a new array to store the next set of beams
    let newBeams = [];

    beams.forEach((beam) => {
      // Generate a unique key for the visited position
      const visitedKey = [beam.position.row, beam.position.column].join("-");

      // If the visited position has not been recorded yet
      // Create an empty object to keep track of visited directions for the position
      if (!visited[visitedKey]) {
        visited[visitedKey] = {};
      }

      // Mark the current direction as visited for the position
      visited[visitedKey][beam.direction] = true;

      // Get the character at the current position in the map
      const currentChar = lines[beam.position.row]
        ? lines[beam.position.row][beam.position.column]
        : null;

      // Get the possible next directions based on the current character and direction
      const nextDirections = getNextDirections(currentChar, beam.direction);

      nextDirections.forEach((direction) => {
        // Iterate over each possible next direction
        const newBeam = {
          // Calculate the new position based on the current position and direction
          position: movePosition(beam.position, direction),
          direction: direction,
        };

        // Check if it is off the map, skip if it is
        if (
          !lines[newBeam.position.row] ||
          !lines[newBeam.position.row][newBeam.position.column]
        ) {
          return;
        }

        // Generate a unique key for the new position
        const key = [newBeam.position.row, newBeam.position.column].join("-");

        // Skip this beam if it has already been visited going the same direction
        if (visited[key] && visited[key][direction]) {
          return;
        }

        // Add the new beam to the next set of beams
        newBeams.push(newBeam);
      });
    });

    // Update the current set of beams with the next set of beams
    beams = newBeams;
  }

  const result = Object.keys(visited).length;

  return result;
};

// Main function
const main = async () => {
  try {
    const input = await fs.readFile("input.txt", "utf8");

    const lines = input.split("\n").map((line) => line.split(""));

    // Empty array to store every possible starting positions
    const startingPositions = [];

    // Popultate starting positions
    for (let i = 0; i < lines.length; i++) {
      startingPositions.push({
        position: { row: i, column: 0 },
        direction: "right",
      });
      startingPositions.push({
        position: { row: i, column: lines[i].length - 1 },
        direction: "left",
      });
    }

    for (let j = 0; j < lines[0].length; j++) {
      startingPositions.push({
        position: { row: 0, column: j },
        direction: "down",
      });
      startingPositions.push({
        position: { row: lines.length - 1, column: j },
        direction: "up",
      });
    }

    let maxEnergizedTiles = 0;

    startingPositions.forEach((position) => {
      let energized = energizedTiles(lines, position);

      if (energized > maxEnergizedTiles) {
        maxEnergizedTiles = energized;
      }
    });

    console.log(maxEnergizedTiles);

    return maxEnergizedTiles;
  } catch (err) {
    throw err;
  }
};

main();
