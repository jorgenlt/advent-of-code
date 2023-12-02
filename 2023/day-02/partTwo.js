import { readLines } from "../utils/readLines.js";

const sumPossibleGamesId = async () => {
  try {
    const games = await readLines("input.csv");

    let sumOfPowersInSets = 0;

    games.forEach((game) => {
      const gameId = Number(game.match(/\d+/)[0]);

      const subsets = game.split(": ")[1].split("; ");

      let red = 0,
        green = 0,
        blue = 0;

      subsets.forEach((subset) => {
        subset.split(",").forEach((cube) => {
          const numberOfCubes = Number(cube.match(/\d+/)[0]);
          const color = cube.match(/[a-z]+/)[0];
          if (color === "red" && numberOfCubes > red) {
            red = numberOfCubes;
          }
          if (color === "green" && numberOfCubes > green) {
            green = numberOfCubes;
          }
          if (color === "blue" && numberOfCubes > blue) {
            blue = numberOfCubes;
          }
        });
      });

      sumOfPowersInSets += red * green * blue;
    });

    console.log("sumOfPowersInSets: ", sumOfPowersInSets);
  } catch (err) {
    console.error(err);
  }
};

sumPossibleGamesId();
