import { readLines } from "../utils/readLines.js";

const sumPossibleGamesId = async () => {
  try {
    const games = await readLines("input.csv");

    let sum = 0;

    // Iterate over each game
    games.forEach((game) => {
      // Extract the game ID from the game string
      const gameId = Number(game.match(/\d+/)[0]);

      // Split the game string to get subsets of cubes
      const subsets = game.split(": ")[1].split("; ");

      // Color variables
      let red = 0,
        green = 0,
        blue = 0;

      // Iterate over each subset
      subsets.forEach((subset) => {
        // Split the subset string to get individual cubes
        subset.split(",").forEach((cube) => {
          // Extract the number of cubes and their color from the cube string
          const numberOfCubes = Number(cube.match(/\d+/)[0]);
          const color = cube.match(/[a-z]+/)[0];

          // Check the color of the cube and update the corresponding color variable if necessary
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

      // If all color variables are within their limits, add the game ID to the sum
      if (red <= 12 && green <= 13 && blue <= 14) {
        sum += gameId;
      }
    });

    console.log(sum);
  } catch (err) {
    console.error(err);
  }
};

sumPossibleGamesId();
