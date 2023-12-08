import { readFile } from "../utils/readFile.js";

const main = async () => {
  try {
    const input = (await readFile("input.txt")).split("\n\n");

    const instructions = input[0].split("");
    const nodes = {};

    input[1]
      .split("\n")
      .map((e) => e.match(/[A-Z]+/g))
      .forEach((node) => {
        if (node) {
          const [nodeName, leftNode, rightNode] = node;
          nodes[nodeName] = { L: leftNode, R: rightNode };
        }
      });

    const startNode = "AAA";
    let currentNode = startNode;
    let steps = 0;
    let currentInstructionIndex = 0;

    while (true) {
      currentNode = nodes[currentNode][instructions[currentInstructionIndex]];
      steps++;
      currentInstructionIndex =
        (currentInstructionIndex + 1) % instructions.length;

      if (currentNode === "ZZZ") {
        console.log("steps:", steps);
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

main();
