import { readFile } from "fs/promises";
import { createGunzip } from "zlib";

const parseInput = (input) => {
  return input.split("\n");
};

const initializeRegister = (instructions) => {
  const register = new Map();

  // Adding bots and outputs
  instructions.forEach((instruction) => {
    if (instruction.split(" ")[0] === "bot") {
      const bot = instruction.match(/bot \d+/)[0];

      if (!register.has(bot)) {
        register.set(bot, { high: null, low: null });
      }
    }

    if (/output/.test(instruction)) {
      const outputs = instruction.match(/output \d+/g);

      outputs.forEach((output) => {
        if (!register.has(output)) {
          register.set(output, []);
        }
      });
    }
  });

  // Adding initial chips
  instructions.forEach((instruction) => {
    if (instruction.includes("value")) {
      const [chip, bot] = instruction.match(/\d+|bot \d+/g);
      const chipValue = Number(chip);
      const botData = register.get(bot);

      if (!botData.low) {
        botData.low = chipValue;
      } else if (chipValue > botData.low) {
        botData.high = chipValue;
      } else {
        botData.high = botData.low;
        botData.low = chipValue;
      }

      register.set(bot, botData);
    }
  });

  return register;
};

const getBotWithTwoChips = (register) => {
  for (const [bot, chips] of register) {
    if (chips.high && chips.low) {
      return bot;
    }
  }

  return false;
};

const getInstruction = (instructions, bot) => {
  for (const instruction of instructions) {
    if (/bot \d+ gives/.test(instruction)) {
      if (instruction.match(/bot \d+/)[0] === bot) {
        return instruction;
      }
    }
  }
};

const distributeChip = (register, match, botData) => {
  const givesLowTo = match[1];
  const givesHighTo = match[2];

  if (/output/.test(givesLowTo)) {
    register.set(givesLowTo, [...register.get(givesLowTo), botData.low]);
  } else {
    const receivingBotData = register.get(givesLowTo);

    if (!receivingBotData.low) {
      receivingBotData.low = botData.low;
    } else if (botData.low > receivingBotData.low) {
      receivingBotData.high = botData.low;
    } else {
      receivingBotData.high = receivingBotData.low;
      receivingBotData.low = botData.low;
    }

    register.set(givesLowTo, receivingBotData);
  }

  if (/output/.test(givesHighTo)) {
    register.set(givesHighTo, [...register.get(givesHighTo), botData.high]);
  } else {
    const receivingBotData = register.get(givesHighTo);

    if (!receivingBotData.low) {
      receivingBotData.low = botData.high;
    } else if (botData.high > receivingBotData.low) {
      receivingBotData.high = botData.high;
    } else {
      receivingBotData.high = receivingBotData.low;
      receivingBotData.low = botData.high;
    }

    register.set(givesHighTo, receivingBotData);
  }

  return register;
};

const solvePuzzle = (input) => {
  const instructions = parseInput(input);
  let register = initializeRegister(instructions);

  let botWithTwoChips = getBotWithTwoChips(register);

  while (botWithTwoChips) {
    const botData = register.get(botWithTwoChips);

    if (botData.high === 61 && botData.low === 17) {
      return botWithTwoChips;
    }

    const instruction = getInstruction(instructions, botWithTwoChips);
    const regex =
      /gives low to ((?:bot|output) \d+) and high to ((?:bot|output) \d+)/;
    const match = instruction.match(regex);

    if (match) {
      register = distributeChip(register, match, botData);
      register.set(botWithTwoChips, { high: null, low: null });
      botWithTwoChips = getBotWithTwoChips(register);
    }
  }
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
