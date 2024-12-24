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
  for (const gate of gates) {
    if (wireValues.has(gate.wire)) continue;

    const [input1, input2] = gate.inputs;

    if (wireValues.has(input1) && wireValues.has(input2)) {
      const inputs = [wireValues.get(input1), wireValues.get(input2)];

      wireValues.set(gate.wire, performOperation(inputs, gate.operator));
    }
  }

  return wireValues;
};

const getDecimalNumber = (wireValues) => {
  const sortedZValues = Array.from(wireValues)
    .filter(([key, value]) => key.startsWith("z"))
    .sort((a, b) => {
      const numA = Number(a[0].substring(1));
      const numB = Number(b[0].substring(1));

      return numB - numA;
    });

  const result = [];

  sortedZValues.forEach((value) => {
    const bit = value[1];

    result.push(bit);
  });

  return parseInt(result.join(""), 2);
};

const solvePuzzle = (input) => {
  const { initialWireValues, gates } = parseInput(input);

  let wireValues = initialWireValues;

  let currentSize = wireValues.size;
  let changed = true;

  while (changed) {
    wireValues = simulateCircuit(wireValues, gates);

    if (wireValues.size === currentSize) {
      changed = false;
    } else {
      currentSize = wireValues.size;
    }
  }

  const result = getDecimalNumber(wireValues);

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
