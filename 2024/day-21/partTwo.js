import { readFile } from "fs/promises";

const firstPad = {};
"789\n456\n123\n 0A".split("\n").forEach((line, row) => {
  [...line].forEach((c, col) => {
    if (c !== " ") {
      firstPad[c] = [row, col];
    }
  });
});

const secondPath = {};
" ^A\n<v>".split("\n").forEach((line, row) => {
  [...line].forEach((c, col) => {
    if (c !== " ") {
      secondPath[c] = [row, col];
    }
  });
});

const generateSequencesFromLetterToLetter = (keyPad, start, end) => {
  const sequences = [];
  const toCheck = [[start, ""]];
  while (toCheck.length > 0) {
    const [currentPosition, path] = toCheck.pop();
    const target = keyPad[end];

    if (currentPosition.toString() === target.toString()) {
      sequences.push(path);
      continue;
    }

    const columnMove = target[1] - currentPosition[1];
    if (columnMove !== 0) {
      const newPoint = [
        currentPosition[0],
        currentPosition[1] + Math.sign(columnMove),
      ];
      if (
        Object.values(keyPad).some(
          (point) => point.toString() === newPoint.toString()
        )
      ) {
        toCheck.push([newPoint, path + (columnMove > 0 ? ">" : "<")]);
      }
    }

    const rowMove = target[0] - currentPosition[0];
    if (rowMove !== 0) {
      const newPoint = [
        currentPosition[0] + Math.sign(rowMove),
        currentPosition[1],
      ];
      if (
        Object.values(keyPad).some(
          (point) => point.toString() === newPoint.toString()
        )
      ) {
        toCheck.push([newPoint, path + (rowMove > 0 ? "v" : "^")]);
      }
    }
  }
  return sequences;
};

const cache = {};

const getMinimalSequenceLength = (keyPad, code, robots) => {
  const cacheKey = `${Object.keys(keyPad).length}-${code}-${robots}`;
  if (cache[cacheKey] !== undefined) {
    return cache[cacheKey];
  }

  if (robots === 0) {
    cache[cacheKey] = code.length;
    return code.length;
  }

  let currentPosition = keyPad["A"];
  let minimalLength = 0;
  const newRobots = robots - 1;

  for (const letter of code) {
    minimalLength += Math.min(
      ...generateSequencesFromLetterToLetter(
        keyPad,
        currentPosition,
        letter
      ).map((sequence) =>
        getMinimalSequenceLength(secondPath, sequence + "A", newRobots)
      )
    );

    currentPosition = keyPad[letter];
  }

  cache[cacheKey] = minimalLength;
  return minimalLength;
};

const solvePuzzle = (input) => {
  const result = input.split("\n").reduce((result, code) => {
    const minValue = getMinimalSequenceLength(firstPad, code, 26);
    const numericValue = parseInt(
      [...code].filter((c) => "1234567890".includes(c)).join(""),
      10
    );
    return result + minValue * numericValue;
  }, 0);

  return result;
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
