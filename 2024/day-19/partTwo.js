import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [patternsSection, designsSection] = input.split("\n\n");
  const patterns = patternsSection.split(", ");
  const designs = designsSection.split("\n");

  return { patterns, designs };
};

const designIsPossible = (design, patterns, memo) => {
  if (design === "") return { isPossible: true, count: 1, usedPatterns: [] };
  if (memo.has(design)) return memo.get(design);

  let totalCount = 0;
  let allUsedPatterns = [];

  for (const pattern of patterns) {
    if (design.startsWith(pattern)) {
      const result = designIsPossible(
        design.slice(pattern.length),
        patterns,
        memo
      );

      if (result.isPossible) {
        totalCount += result.count;
        allUsedPatterns.push([pattern, ...result.usedPatterns]);
      }
    }
  }

  const result = {
    isPossible: totalCount > 0,
    count: totalCount,
    usedPatterns: allUsedPatterns,
  };

  memo.set(design, result);

  return result;
};

const solvePuzzle = (input) => {
  const { patterns, designs } = parseInput(input);

  let possibleCount = 0;

  designs.forEach((design) => {
    const memo = new Map();
    const result = designIsPossible(design, patterns, memo);

    if (result.isPossible) {
      possibleCount += result.count;
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
