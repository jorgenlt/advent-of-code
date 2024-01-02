import { readFile } from "fs/promises";

const removeItemOnce = (arr, index) => {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

const main = async () => {
  try {
    const input = (await readFile("test.txt", "utf-8")).trim().split("\n");

    // Find all programs that have a disk of other programs
    // (programs that are holding other programs)
    const programsWithDiscs = [];

    input.forEach((e) => {
      if (e.includes("->")) {
        const name = e.split(" ")[0];
        const holding = e.split("-> ")[1].split(", ");

        // If program is not on bottom, push it, see Part 1
        if (name !== "fbgguv" && name !== "tknk") {
          programsWithDiscs.push({
            name,
            holding,
          });
        }
      }
    });

    // Create a map of weights of the programs
    const weights = new Map();

    input.forEach((e) => {
      const name = e.split(" ")[0];
      const weight = Number(e.split(/[(|)]/g)[1]);
    });

    // The program that no other program is holding is the
    // one at the bottom at the tower
    // programsWithDiscs.forEach((program, i) => {
    //   const { name } = program;

    //   const otherPrograms = removeItemOnce([...programsWithDiscs], i);

    //   let isBottom = true;

    //   otherPrograms.forEach((program) => {
    //     const { holding } = program;
    //     if (holding.indexOf(name) > -1) {
    //       isBottom = false;
    //     }
    //   });

    //   if (isBottom) {
    //     // Log the result
    //     console.log(name);
    //     return;
    //   }
    // });
  } catch (err) {
    console.error(err);
  }
};

main();
