import { readFile } from "fs/promises";

const fuelCost = (fromPos, toPos) => {
  return Math.abs(fromPos - toPos);
};

const leastFuel = (positions) => {
  const posStart = Math.min(...positions);
  const posEnd = Math.max(...positions);

  let leastFuel = Number.MAX_VALUE;

  for (let i = posStart; i <= posEnd; i++) {
    // find fuelcost for each position to move to position i
    let fuelCostCount = 0;

    positions.forEach((pos) => {
      fuelCostCount += fuelCost(pos, i);
    });

    if (fuelCostCount < leastFuel) {
      leastFuel = fuelCostCount;
    }
  }

  return leastFuel;
};

const main = async () => {
  try {
    const positions = (await readFile("input.txt", "utf-8"))
      .trim()
      .split(",")
      .map(Number);

    console.log(leastFuel(positions));
  } catch (err) {
    console.error(err);
  }
};

main();
