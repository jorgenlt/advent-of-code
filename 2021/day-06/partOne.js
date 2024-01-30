import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split(",")
      .map(Number);

    let prevFish = [...input];
    let currentFish = [];

    for (let i = 0; i < 80; i++) {
      currentFish = [...prevFish];

      // How many lanternfish would there be after 80 days?
      prevFish.forEach((fish, j) => {
        // If 0, a new fish is created and set to 8 days. Reset fish to 6.
        if (fish === 0) {
          currentFish[j] = 6;
          currentFish.push(8);
        } else {
          // Current fish has 1 day less till cycle end
          currentFish[j] = currentFish[j] - 1;
        }
      });

      prevFish = [...currentFish];
    }

    console.log(currentFish.length);
  } catch (err) {
    console.error(err);
  }
};

main();
