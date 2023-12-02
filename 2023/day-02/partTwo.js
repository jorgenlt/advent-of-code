import { readLines } from "../utils/readLines.js";

const sumPossibleGamesId = async () => {
  try {
    const games = await readLines("input.csv");

    let sumOfPowersInSets = 0;

    // Iterating over each game
    games.forEach((game) => {
      // Splitting the game into subsets
      const subsets = game.split(": ")[1].split("; ");

      // Variables to store the number of red, green, and blue cubes
      let red = 0,
        green = 0,
        blue = 0;

      // Iterating over each subset
      subsets.forEach((subset) => {
        // Splitting the subset into cubes and iterating over each cube
        subset.split(",").forEach((cube) => {
          // Extracting the number of cubes from the cube string
          const numberOfCubes = Number(cube.match(/\d+/)[0]);
          // Extracting the color of the cubes from the cube string
          const color = cube.match(/[a-z]+/)[0];
          // If the color is red and the number of cubes is greater than the current red count, update the red count
          if (color === "red" && numberOfCubes > red) {
            red = numberOfCubes;
          }
          // If the color is green and the number of cubes is greater than the current green count, update the green count
          if (color === "green" && numberOfCubes > green) {
            green = numberOfCubes;
          }
          // If the color is blue and the number of cubes is greater than the current blue count, update the blue count
          if (color === "blue" && numberOfCubes > blue) {
            blue = numberOfCubes;
          }
        });
      });

      // Adding the product of red, green, and blue counts to the sum of powers in sets
      sumOfPowersInSets += red * green * blue;
    });

    console.log("sumOfPowersInSets: ", sumOfPowersInSets);
  } catch (err) {
    console.error(err);
  }
};

sumPossibleGamesId();
