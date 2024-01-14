import { readFile } from "fs/promises";

const processIntcode = (input) => {
  // Replace position 1 with the value 12 and replace position 2 with the value 2.
  input[1] = 12;
  input[2] = 2;

  for (let i = 0; i < input.length; i += 4) {
    const opcode = input[i];

    if (opcode === 99) break;

    const parameters = [input[i + 1], input[i + 2], input[i + 3]];

    const input1 = input[parameters[0]];
    const input2 = input[parameters[1]];

    const outputPos = parameters[2];

    if (opcode === 1) input[outputPos] = input1 + input2;

    if (opcode === 2) input[outputPos] = input1 * input2;
  }

  return input[0];
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split(",")
      .map(Number);

    const result = processIntcode(input);

    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

main();
