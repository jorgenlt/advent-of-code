import { readFile } from "fs/promises";
import allPermutations from "../../utils/allPermutations.js";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim().split("\n");

    const distances = new Map();

    input.forEach((line) => {
      const [departure, _, destination, __, distance] = line.split(" ");

      if (!distances.has(departure)) {
        distances.set(departure, new Map());
      }

      if (!distances.has(destination)) {
        distances.set(destination, new Map());
      }

      distances.get(departure).set(destination, Number(distance));
      distances.get(destination).set(departure, Number(distance));
    });

    const permutations = allPermutations([...distances.keys()]);

    let shortest = Infinity;
    let longest = 0;

    for (let i = 0; i < permutations.length; i++) {
      const route = permutations[i];

      let routeDistance = 0;

      for (let j = 0; j < route.length - 1; j++) {
        const from = route[j];
        const to = route[j + 1];

        routeDistance += distances.get(from).get(to);
      }

      if (routeDistance < shortest) {
        shortest = routeDistance;
      }

      if (routeDistance > longest) {
        longest = routeDistance;
      }
    }

    console.log("SHORTEST:", shortest);
    console.log("LONGEST:", longest);
  } catch (err) {
    console.error(err);
  }
};

main();
