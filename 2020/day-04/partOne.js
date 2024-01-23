import { readFile } from "fs/promises";

const isValid = (passport) => {
  if (passport.size === 8) {
    return true;
  }
  if (!passport.has("cid") && passport.size === 7) {
    return true;
  }

  return false;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n\n")
      .map((e) => {
        const passport = new Map();
        e.split(/[ \n]/g).forEach((field) => {
          const [key, value] = field.split(":");
          passport.set(key, value);
        });
        return passport;
      });

    let validCount = 0;

    input.forEach((passport) => {
      if (isValid(passport)) {
        validCount++;
      }
    });

    console.log(validCount);
  } catch (err) {
    console.error(err);
  }
};

main();
