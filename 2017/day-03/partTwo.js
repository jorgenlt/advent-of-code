import ulamsSpiralCoords from "../../utils/ulamsSpiralCoords.js";
import sumAdjacentPositionsInMap from "../../utils/sumAdjacentPositionsInMap.js";

const main = async () => {
  try {
    const input = 361527;

    // Map to store coordinates "x, y" and value
    const map = new Map();

    // Create coordinates in an Ulams spiral, estimate size of the spiral
    const ulamsCoords = ulamsSpiralCoords(input / 1000);

    // Iterate all the created coordinates
    for (let i = 0; i < ulamsCoords.length; i++) {
      // Current coordinates
      const coords = ulamsCoords[i];

      const sumAdjacentPositions = sumAdjacentPositionsInMap(map, coords);

      // Update map with coordinates and sum of adjacent positions
      map.set(coords.join(), sumAdjacentPositions);

      // When the sum is larger than the input number, log the sum
      if (sumAdjacentPositions > input) {
        console.log(sumAdjacentPositions);
        return;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

main();
