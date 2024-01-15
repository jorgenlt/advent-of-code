import hasStrictlyTwoAdjacentDuplicates from "../../utils/hasStrictlyTwoAdjacentDuplicates.js";

const doesNeverDecrease = (str) => {
  for (let i = 0; i < str.length; i++) {
    if (str[i + 1] < str[i]) {
      return false;
    }
  }
  return true;
};

const main = () => {
  try {
    const input = "197487-673251".split("-").map(Number);

    const [from, to] = input;

    const passwords = [];

    for (let i = from; i <= to; i++) {
      if (
        hasStrictlyTwoAdjacentDuplicates(i.toString()) &&
        doesNeverDecrease(i.toString())
      ) {
        passwords.push(i);
      }
    }

    console.log(passwords.length); // 1126
  } catch (err) {
    console.error(err);
  }
};

main();
