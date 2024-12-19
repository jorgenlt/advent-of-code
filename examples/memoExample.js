import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [patternsSection, designsSection] = input.split("\n\n");
  const patterns = patternsSection.split(", ");
  const designs = designsSection.split("\n");

  return { patterns, designs };
};

const designIsPossible = (design, patterns, memo) => {
  if (design === "") return true;
  if (memo.has(design)) return memo.get(design);

  for (const pattern of patterns) {
    if (design.startsWith(pattern)) {
      if (designIsPossible(design.slice(pattern.length), patterns, memo)) {
        memo.set(design, true);
        return true;
      }
    }
  }

  memo.set(design, false);
  return false;
};

const solvePuzzle = (input) => {
  const { patterns, designs } = parseInput(input);

  let possibleCount = 0;

  designs.forEach((design) => {
    const memo = new Map();

    if (designIsPossible(design, patterns, memo)) {
      possibleCount++;
    }
  });

  return possibleCount;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
