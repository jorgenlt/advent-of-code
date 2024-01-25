import { readFile } from "fs/promises";

const move = (dir, length, aim) => {
  const moves = {
    forward: [length, length * aim, 0],
    down: [0, 0, length],
    up: [0, 0, -length],
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

    let currPos = [0, 0, 0]; // [x, y, aim]

    input.forEach((step) => {
      const [dir, length] = step;

      const [currX, currY, currAim] = currPos;

      const [moveX, moveY, aim] = move(dir, length, currAim);

      currPos = [currX + moveX, currY + moveY, currAim + aim];
    });

    const [x, y] = currPos;

    console.log(x * y);
  } catch (err) {
    console.error(err);
  }
};

main();
