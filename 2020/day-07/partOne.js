import { readFile } from "fs/promises";

const parseInput = (input) => {
  const bags = {};
  input
    .trim()
    .split("\n")
    .forEach((rule) => {
      const [container, contents] = rule.split(" contain ");
      const containerBag = container.split(" bag")[0];
      const contentBags = parseContents(contents);
      bags[containerBag] = contentBags;
    });
  return bags;
};

const parseContents = (contents) => {
  if (contents === "no other bags.") {
    // If the bag contains no other bags, return an empty array
    return [];
  }
  return contents.split(", ").map(parseContent);
};

const parseContent = (content) => {
  // Extract the count of the bag
  const count = parseInt(content.substr(0, 1));
  // Extract the name of the bag
  const bagName = content.substr(2).split(" bag")[0];

  return [count, bagName];
};

// Function to check if a bag can directly or indirectly contain a shiny gold bag
const canContainShinyGold = (bag, bags) => {
  if (bag === "shiny gold") {
    // If the bag is shiny gold, it can contain itself
    return true;
  }
  if (!bags[bag].length) {
    // If the bag contains no other bags, it cannot contain shiny gold
    return false;
  }
  // Check if any of the bag's contents can contain shiny gold
  return bags[bag].some(([count, name]) => canContainShinyGold(name, bags));
};

// Function to count the number of bags that can contain a shiny gold bag
const countBagsContainingShinyGold = (bags) => {
  // Filter the bags for those that can contain shiny gold and subtract 1 (shiny gold itself)
  return (
    Object.keys(bags).filter((bag) => canContainShinyGold(bag, bags)).length - 1
  );
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    const bags = parseInput(input);

    const shinyGoldCount = countBagsContainingShinyGold(bags);

    console.log(shinyGoldCount);
  } catch (err) {
    // Log any errors
    console.error(err);
  }
};

main();
