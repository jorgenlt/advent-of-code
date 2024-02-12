import { readFile } from "fs/promises";
import crypto from "crypto";

const findPassword = (str) => {
  const password = Array(8).fill(null);

  let i = 1;

  while (password.includes(null)) {
    let found = false;

    while (!found) {
      const hash = crypto
        .createHash("md5")
        .update(str + i.toString())
        .digest("hex");

      if (hash.startsWith("00000")) {
        const pos = Number(hash.charAt(5));
        const char = hash.charAt(6);

        if (pos < 8 && password[pos] === null) {
          password[pos] = char;
          found = true;
        }
      }

      i++;
    }
  }
  return password.join("");
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
