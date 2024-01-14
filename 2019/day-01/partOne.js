import { readFile } from "fs/promises";

const calcFuel = (mass) => Math.floor(mass / 3) - 2;

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map(Number);

    let fuelCounter = 0;

    input.forEach((mass) => {
      fuelCounter += calcFuel(mass);
    });

    console.log(fuelCounter);
  } catch (err) {
    console.error(err);
  }
};

main();
