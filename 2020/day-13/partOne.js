import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [section1, section2] = input.split("\n");

  return [Number(section1), section2.match(/\d+/g).map(Number)];
};

const getHighestDecimalNumber = (numbers) => {
  return numbers.reduce((max, current) => {
    const maxDecimal = max - Math.floor(max);
    const currentDecimal = current - Math.floor(current);

    return currentDecimal > maxDecimal ? current : max;
  });
};

const solvePuzzle = (input) => {
  const [departTime, busIds] = parseInput(input);

  const totalDeparts = busIds.map((id) => departTime / id);

  const highestDecimalNumber = getHighestDecimalNumber(totalDeparts);
  const indexHigestDecimal = totalDeparts.indexOf(highestDecimalNumber);
  const busId = busIds[indexHigestDecimal];
  const departTimeBus = busId * Math.ceil(highestDecimalNumber);
  const waitTime = departTimeBus - departTime;

  const result = waitTime * busId;

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
