import { readFile } from "fs/promises";

const move = (dir, length) => {
  const moves = {
    forward: [length, 0],
    down: [0, length],
    up: [0, -length],
  };

  return moves[dir] || console.error("Dir not found.");
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((e) => {
        const [dir, length] = e.split(" ");
        return [dir, Number(length)];
      });

    let currPos = [0, 0];

    input.forEach((step) => {
      const [dir, length] = step;

      const [moveX, moveY] = move(dir, length);

      const [currX, currY] = currPos;

      currPos = [currX + moveX, currY + moveY];
    });

    console.log(currPos[0] * currPos[1]);
  } catch (err) {
    console.error(err);
  }
};

main();
