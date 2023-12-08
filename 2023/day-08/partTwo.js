import { readFile } from "../utils/readFile.js";
import { lcm } from "mathjs";

const main = async () => {
  try {
    const input = (await readFile("input.txt")).split("\n\n");
    const nodePart = input[1].split("\n");
    const instructionPart = input[0].split("");

    // Creating object with nodes and array of starting nodes
    const nodes = {};
    const startingNodes = [];

    nodePart.forEach((e) => {
      const matchedNode = e.match(/[A-Z]+/g);
      if (matchedNode) {
        const [nodeName, leftNode, rightNode] = matchedNode;
        nodes[nodeName] = { L: leftNode, R: rightNode };

        const firstNode = e.split(" ")[0];
        if (firstNode[2] === "A") {
          startingNodes.push(firstNode);
        }
      }
    });

    // Mapping over each starting node and finding number steps for each node
    const allSteps = startingNodes.map((node) =>
      steps(instructionPart, node, nodes)
    );

    // Finding least common multiple of the number of steps
    const leastCommonMultiple = lcm(...allSteps);

    console.log(leastCommonMultiple);
  } catch (err) {
    console.log(err);
  }
};

const steps = (instructions, node, nodes) => {
  let currentNode = node;
  let steps = 0;
  let currentInstructionIndex = 0;

  while (true) {
    currentNode = nodes[currentNode][instructions[currentInstructionIndex]];
    steps++;
    currentInstructionIndex =
      (currentInstructionIndex + 1) % instructions.length;

    if (currentNode[2] === "Z") {
      return steps;
    }
  }
};

main();
