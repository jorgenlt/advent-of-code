import { readFile } from "fs/promises";

const calcFuel = (mass) => Math.floor(mass / 3) - 2;

const recursiveCalcFuel = (mass) => {
  const fuel = calcFuel(mass);

  if (fuel <= 0) {
    return 0;
  } else {
    return fuel + recursiveCalcFuel(fuel);
  }
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map(Number);

    let recursiveFuelCounter = 0;

    input.forEach((mass) => recursiveFuelCounter += recursiveCalcFuel(mass));

    console.log(recursiveFuelCounter);
  } catch (err) {
    console.error(err);
  }
};

main();
