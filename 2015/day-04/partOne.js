const crypto = require("crypto");

const main = async () => {
  try {
    const input = "bgvyzdsv";

    let string = input;
    let i = 1;

    while (true) {
      const hash = crypto
        .createHash("md5")
        .update(string + i.toString())
        .digest("hex");

      if (hash.startsWith("00000")) {
        console.log(input + i);
        break;
      }

      i++;
    }
  } catch (err) {
    console.error(err);
  }
};

main();
