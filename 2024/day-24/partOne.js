import { readFile } from "fs/promises";

const parseInput = (input) => {
  const [initialWireValuesSection, gatesSection] = input.trim().split("\n\n");

  const initialWireValues = new Map();

  initialWireValuesSection.split("\n").forEach((wireValue) => {
    const [key, value] = wireValue.split(": ");

    initialWireValues.set(key, Number(value));
  });

  const gates = [];

  gatesSection.split("\n").forEach((gate) => {
    const [input1, operator, input2, _, wire] = gate.split(" ");

    gates.push({
      inputs: [input1, input2],
      operator,
      wire,
    });
  });

  return {
    initialWireValues,
    gates,
  };
};

const performOperation = ([input1, input2], operator) => {
  switch (operator) {
    case "AND":
      return input1 & input2;
    case "OR":
      return input1 | input2;
    case "XOR":
      return input1 ^ input2;
    default:
      throw new Error("Invalid operator");
  }
};

const simulateCircuit = (wireValues, gates) => {
  let changesMade;
  do {
    changesMade = false;
    for (const { inputs, operator, wire } of gates) {
      if (!wireValues.has(wire)) {
        const [input1, input2] = inputs.map((input) => wireValues.get(input));
        if (input1 !== undefined && input2 !== undefined) {
          wireValues.set(wire, performOperation([input1, input2], operator));
          changesMade = true;
        }
      }
    }
  } while (changesMade);

  return wireValues;
};

const getDecimalNumber = (wireValues) => {
  return parseInt(
    Array.from(wireValues)
      .filter(([key]) => key.startsWith("z"))
      .sort((a, b) => Number(b[0].substring(1)) - Number(a[0].substring(1)))
      .map(([, value]) => value)
      .join(""),
    2
  );
};

const solvePuzzle = (input) => {
  const { initialWireValues, gates } = parseInput(input);

  const finalWireValues = simulateCircuit(initialWireValues, gates);

  return getDecimalNumber(finalWireValues);
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
