import { readFile } from "fs/promises";
import crypto from "crypto";

const findPassword = (str) => {
  let password = "";
  let i = 1;

  for (let j = 0; j < 8; j++) {
    let found = false;

    while (!found) {
      const hash = crypto
        .createHash("md5")
        .update(str + i.toString())
        .digest("hex");

      if (hash.startsWith("00000")) {
        password += hash.charAt(5);
        found = true;
      }

      i++;
    }
  }
  return password;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8")).trim();

    const password = findPassword(input);
    console.log(password);
  } catch (err) {
    console.error(err);
  }
};

main();
