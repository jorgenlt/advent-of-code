import fs from "fs/promises";

const main = async () => {
  const input = (await fs.readFile("input.txt", "utf8")).trim().split("");

  let floor = 0;

  input.forEach((e) => (e === "(" ? floor++ : floor--));

  console.log(floor);
};

main();
