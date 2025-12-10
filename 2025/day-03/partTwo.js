import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.trim().split("\n");
};

const maxSubsequenceOfLength = (s, k) => {
  const stack = [];
  const n = s.length;

  for (let i = 0; i < n; i++) {
    const ch = s[i];

    while (
      stack.length > 0 &&
      stack[stack.length - 1] < ch &&
      stack.length - 1 + (n - i) >= k
    ) {
      stack.pop();
    }

    if (stack.length < k) {
      stack.push(ch);
    }
  }

  return stack.join("");
};

const solvePuzzle = (input) => {
  const banks = parseInput(input);

  let sum = 0;
  const k = 12;

  for (const bank of banks) {
    const subseq = maxSubsequenceOfLength(bank, k);
    sum += Number(subseq);
  }

  return sum;
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
