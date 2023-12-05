import { readFile } from "../utils/readFile.js";
import { arrayRange } from "../utils/arrayRange.js";

const main = async () => {
  try {
    // const input = (await readFile("input.csv")).split("\n\n");

    // const seedsRanges = input[0].split(" ").slice(1).map(Number);

    // let seeds = [];

    // const blocks = input.slice(1);

    // for (let i = 0; i < seedsRanges.length; i += 2) {
    //   seeds.push([seedsRanges[i], seedsRanges[i + 1]]);
    // }

    // seeds = seeds.reduce((acc, seedRange) => {
    //   for (let i of arrayRange(seedRange[0], seedRange[1], 1)) {
    //     acc.push(i);
    //   }
    //   return acc;
    // }, []);
    

    // // For each block, split the lines, then split each line
    // // and convert them to numbers
    // const ranges = blocks.map((block) => {
    //   const lines = block.split(":\n")[1].split("\n");
    //   return lines.map((line) => line.split(" ").map(Number));
    // });

    // // For each range, map the seeds through it
    // for(let i = 0; i < ranges.length; i++) {
    //   for(let j = 0; j < seeds.length; j++) {
    //     for(let [a, b, c] of ranges[i]) {
    //       if (b <= seeds[j] && seeds[j] < b + c) {
    //         seeds[j] = seeds[j] - b + a;
    //         break;
    //       }
    //     }
    //   }
    // }

    // // Minimum value
    // const minSeed = seeds.reduce((min, seed) => Math.min(min, seed), Infinity);
    // console.log(minSeed);

  } catch (err) {
    console.error(err);
  }
};

main();
