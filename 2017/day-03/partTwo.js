import manhattanDistance from "../../utils/manhattanDistance.js";
import findCoordsInUlamsSpiral from "../../utils/findCoordsInUlamsSpiral.js";

const main = async () => {
  try {
    const input = 361527;

    const start = [0, 0];

    const end = findCoordsInUlamsSpiral(input);

    const shortestPath = manhattanDistance(start, end);

    console.log(shortestPath);
  } catch (err) {
    console.error(err);
  }
};

main();
