import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((l) => {
    const [
      register,
      operator,
      amount,
      _,
      registerVariable,
      comparisonOperator,
      conditionConstant,
    ] = l.split(" ");

    return {
      register,
      operator,
      amount: Number(amount),
      registerVariable,
      comparisonOperator,
      conditionConstant: Number(conditionConstant),
    };
  });
};

const evaluateCondition = (
  registers,
  registerVariable,
  comparisonOperator,
  conditionConstant
) => {
  switch (comparisonOperator) {
    case ">":
      return registers.get(registerVariable) > conditionConstant;
    case ">=":
      return registers.get(registerVariable) >= conditionConstant;
    case "<":
      return registers.get(registerVariable) < conditionConstant;
    case "<=":
      return registers.get(registerVariable) <= conditionConstant;
    case "==":
      return registers.get(registerVariable) === conditionConstant;
    case "!=":
      return registers.get(registerVariable) !== conditionConstant;
    default:
      return false;
  }
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);

  const registers = new Map();

  let highestValue = 0;

  instructions.forEach((instruction) => {
    const {
      register,
      operator,
      amount,
      registerVariable,
      comparisonOperator,
      conditionConstant,
    } = instruction;

    if (!registers.has(register)) registers.set(register, 0);
    if (!registers.has(registerVariable)) registers.set(registerVariable, 0);

    if (
      evaluateCondition(
        registers,
        registerVariable,
        comparisonOperator,
        conditionConstant
      )
    ) {
      const currRegValue = registers.get(register);
      const newRegValue =
        operator === "inc" ? currRegValue + amount : currRegValue - amount;

      if (newRegValue > highestValue) {
        highestValue = newRegValue;
      }

      registers.set(register, newRegValue);
    }
  });

  const result = Math.max(...registers.values());

  console.log(result);

  console.log("highestValue:", highestValue);
  return result;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    solvePuzzle(input);
  } catch (err) {
    console.error(err);
  }
};

main();
