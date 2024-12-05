import { readFile } from "fs/promises";

const mapRules = (orderingRules) => {
  const map = new Map();

  orderingRules.forEach((rule) => {
    const [printFirst, printAfter] = rule.split("|").map(Number);

    if (map.has(printFirst)) {
      map.set(printFirst, [...map.get(printFirst), printAfter]);
    } else {
      map.set(printFirst, [printAfter]);
    }
  });

  return map;
};

const hasCommonElement = (arr1, arr2) => {
  const set2 = new Set(arr2);
  return arr1.some((num) => set2.has(num));
};

const main = async () => {
  try {
    const [orderingRules, updates] = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n\n")
      .map((element) => element.split("\n"));

    const rules = mapRules(orderingRules);

    let middleNumCount = 0;

    updates.forEach((update) => {
      const updateArray = update.split(",").map(Number);

      let updateIsValid = true;

      for (let i = 0; i < updateArray.length; i++) {
        const page = updateArray[i];
        const pagesAlreadyPrinted = updateArray.slice(0, i);
        const pageRules = rules.get(page);

        // If pagesAlreadyPrinted and pageRules contain one or more common elements the update is not valid
        if (hasCommonElement(pagesAlreadyPrinted, pageRules))
          updateIsValid = false;
      }

      if (updateIsValid) {
        middleNumCount += updateArray[Math.floor(updateArray.length / 2)];
      }
    });

    console.log(middleNumCount);
  } catch (err) {
    console.error(err);
  }
};

main();
