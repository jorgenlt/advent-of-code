import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [section1, section2] = input.trim().split("\n\n");

  const rules = new Map(section2.split("\n").map((l) => l.split(" -> ")));

  return [section1, rules];
};

const simulate = (template, rules, steps) => {
  let pairs = new Map();

  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.slice(i, i + 2);

    if (!pairs.has(pair)) pairs.set(pair, 0);

    pairs.set(pair, pairs.get(pair) + 1);
  }

  const elements = new Map();

  for (const char of template) {
    if (!elements.has(char)) elements.set(char, 0);

    elements.set(char, elements.get(char) + 1);
  }

  for (let step = 0; step < steps; step++) {
    const newPairs = new Map();

    for (const [pair, count] of pairs) {
      if (rules.has(pair)) {
        const insertChar = rules.get(pair);

        if (!elements.has(insertChar)) elements.set(insertChar, 0);
        elements.set(insertChar, elements.get(insertChar) + count);

        const pair1 = pair[0] + insertChar;
        const pair2 = insertChar + pair[1];

        if (!newPairs.has(pair1)) newPairs.set(pair1, 0);
        if (!newPairs.has(pair2)) newPairs.set(pair2, 0);

        newPairs.set(pair1, newPairs.get(pair1) + count);
        newPairs.set(pair2, newPairs.get(pair2) + count);
      }
    }
    pairs = newPairs;
  }

  return elements;
};

const calcResult = (elementsMap) => {
  return Math.max(...elementsMap.values()) - Math.min(...elementsMap.values());
};

const solvePuzzle = (input) => {
  const [template, rules] = parseInput(input);

  const result = calcResult(simulate(template, rules, 40));

  return result;
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
