import fs from "fs/promises";

const main = async () => {
  const input = (await fs.readFile("input.txt", "utf8")).trim();
  const list = input.split(",");

  let sum = 0;
  
  list.forEach((str) => {
    let currentValue = 0;

    str.split("").forEach(char => {
      const ascii = char.charCodeAt(0);
      
      currentValue += ascii;
      currentValue *= 17;
      currentValue %= 256
    })

    sum += currentValue;
  });

  console.log(sum)
};

main();
