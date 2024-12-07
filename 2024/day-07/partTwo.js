import { readFile } from "fs/promises";

const evaExpression = (numbers, operators) => {
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result += numbers[i + 1];
    } else if (operators[i] === "*") {
      result *= numbers[i + 1];
    } else if (operators[i] === "||") {
      result = Number("" + result + numbers[i + 1]);
    }
  }

  return result;
};

const generateOperatorCombinations = (length) => {
  const results = [];
  const operators = ["+", "*", "||"];
  const totalCombinations = Math.pow(operators.length, length);

  for (let i = 0; i < totalCombinations; i++) {
    let combination = [];
    let num = i;

    for (let j = 0; j < length; j++) {
      combination.push(operators[num % operators.length]);
      num = Math.floor(num / operators.length);
    }

    results.push(combination);
  }

  return results;
};

const main = async () => {
  try {
    const equations = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((line) => line.match(/\d+/g).map(Number));

    let sumTestValues = 0;

    for (let i = 0; i < equations.length; i++) {
      const equation = equations[i];
      const [testValue, ...numbers] = equation;
      const operatorCombinations = generateOperatorCombinations(
        numbers.length - 1
      );

      let isPossible = false;

      for (const operators of operatorCombinations) {
        const result = evaExpression(numbers, operators);

        if (result === testValue) {
          isPossible = true;
          break;
        }
      }

      if (isPossible) {
        sumTestValues += testValue;
      }
    }

    console.log(sumTestValues);
  } catch (err) {
    console.error(err);
  }
};

main();
