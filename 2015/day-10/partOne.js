import { readFile } from "fs/promises";

const lookAndSay = (nums) => {
  let result = "";

  let count = 1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) {
      count++;
    } else {
      result += count + nums[i];
      count = 1;
    }
  }

  return result;
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    let currentResult = input;

    for (let i = 1; i <= 50; i++) {
      currentResult = lookAndSay(currentResult);

      if (i === 40) {
        console.log("40 times:", currentResult.length);
      }
    }

    console.log("50 times:", currentResult.length);
  } catch (err) {
    console.error(err);
  }
};

main();
