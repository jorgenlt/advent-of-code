// Function to find sum off values in adjacent positions; NW, N, NE, E, SE, S, SW, W
// in a map.
const sumAdjacentPositionsInMap = (map, coordinates) => {
  // If coordinates is in the center, the starting point, return 1
  if (coordinates.join() === "0,0") {
    return 1;
  }

  let sum = 0;

  // Direction of adjacent position relative to the current position
  const DIRECTIONS = {
    NW: [-1, 1],
    N: [0, 1],
    NE: [1, 1],
    E: [1, 0],
    SE: [1, -1],
    S: [0, -1],
    SW: [-1, -1],
    W: [-1, 0],
  };

  for (let [key, value] of Object.entries(DIRECTIONS)) {
    const coordsToCheck = coordinates.map((coord, i) => coord + value[i]);

    if (map.has(coordsToCheck.join())) {
      sum += map.get(coordsToCheck.join());
    }
  }

  return sum;
};

export default sumAdjacentPositionsInMap;