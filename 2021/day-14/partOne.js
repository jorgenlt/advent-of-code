import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [section1, section2] = input.trim().split("\n\n");
  const rules = new Map(section2.split("\n").map((l) => l.split(" -> ")));

  return [section1, rules];
};

const step = (template, rules) => {
  let newTemplate = "";

  for (let i = 0; i < template.length - 1; i++) {
    const char = template[i];
    const nextChar = template[i + 1];
    const pair = char + nextChar;

    newTemplate += char + (rules.get(pair) || "");
  }

  newTemplate += template.at(-1);

  return newTemplate;
};

const simulate = (template, rules, steps) => {
  let result = template;

  for (let i = 0; i < steps; i++) {
    result = step(result, rules);
  }

  return result;
};

const calcResult = (str) => {
  const chars = new Map();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    chars.set(char, (chars.get(char) || 0) + 1);
  }

  const sorted = [...chars].sort((a, b) => a[1] - b[1]);

  return sorted.at(-1).at(1) - sorted.at(0).at(1);
};

const solvePuzzle = (input) => {
  const [template, rules] = parseInput(input);

  const tenSteps = simulate(template, rules, 10);

  const result = calcResult(tenSteps);

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
