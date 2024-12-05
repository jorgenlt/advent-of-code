import { readFile } from "fs/promises";

const parseInput = (input) => {
  const sections = input.trim().split("\n\n");
  const rules = sections[0]
    .split("\n")
    .map((rule) => rule.split("|").map(Number));
  const updates = sections[1]
    .split("\n")
    .map((update) => update.split(",").map(Number));
  return { rules, updates };
};

const isOrderCorrect = (order, rules) => {
  const indexMap = new Map();
  order.forEach((page, index) => indexMap.set(page, index));

  for (const [before, after] of rules) {
    if (indexMap.has(before) && indexMap.has(after)) {
      if (indexMap.get(before) > indexMap.get(after)) {
        return false;
      }
    }
  }
  return true;
};

const reorderUpdate = (update, rules) => {
  const dependencyGraph = new Map();
  const indegree = new Map();

  update.forEach((page) => {
    dependencyGraph.set(page, []);
    indegree.set(page, 0);
  });

  rules.forEach(([before, after]) => {
    if (dependencyGraph.has(before) && dependencyGraph.has(after)) {
      dependencyGraph.get(before).push(after);
      indegree.set(after, indegree.get(after) + 1);
    }
  });

  const queue = [];
  indegree.forEach((count, page) => {
    if (count === 0) queue.push(page);
  });

  const sortedOrder = [];
  while (queue.length > 0) {
    const current = queue.shift();
    sortedOrder.push(current);

    dependencyGraph.get(current).forEach((neighbor) => {
      indegree.set(neighbor, indegree.get(neighbor) - 1);
      if (indegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    });
  }

  return sortedOrder;
};

const findMiddlePageNumber = (update) => {
  const middleIndex = Math.floor(update.length / 2);
  return update[middleIndex];
};

const solvePuzzle = (input) => {
  const { rules, updates } = parseInput(input);
  let sumOfMiddlePages = 0;

  updates.forEach((update) => {
    if (!isOrderCorrect(update, rules)) {
      const correctedOrder = reorderUpdate(update, rules);
      const middlePageNumber = findMiddlePageNumber(correctedOrder);
      sumOfMiddlePages += middlePageNumber;
    }
  });

  return sumOfMiddlePages;
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
