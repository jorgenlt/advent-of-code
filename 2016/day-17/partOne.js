import crypto from "crypto";

const md5 = (salt) => crypto.createHash("md5").update(salt).digest("hex");

const directions = [
  { dx: 0, dy: -1, directionChar: "U" }, // Up
  { dx: 0, dy: 1, directionChar: "D" }, // Down
  { dx: -1, dy: 0, directionChar: "L" }, // Left
  { dx: 1, dy: 0, directionChar: "R" }, // Right
];

const findShortestPath = (start, end, passcode) => {
  const queue = [];
  queue.push({ ...start, path: "" });

  while (queue.length > 0) {
    const currentLocation = queue.shift();

    if (currentLocation.x === end.x && currentLocation.y === end.y) {
      return currentLocation.path;
    }

    for (const direction of directions) {
      const newX = direction.dx + currentLocation.x;
      const newY = direction.dy + currentLocation.y;

      if (newX < 0 || newX > 3 || newY < 0 || newY > 3) {
        continue;
      }

      const hash = md5(passcode + currentLocation.path);

      const openChars = "bcdef";

      switch (direction.directionChar) {
        case "U":
          if (openChars.includes(hash[0])) {
            queue.push({
              x: newX,
              y: newY,
              path: currentLocation.path + direction.directionChar,
            });
          }
          break;
        case "D":
          if (openChars.includes(hash[1])) {
            queue.push({
              x: newX,
              y: newY,
              path: currentLocation.path + direction.directionChar,
            });
          }
          break;
        case "L":
          if (openChars.includes(hash[2])) {
            queue.push({
              x: newX,
              y: newY,
              path: currentLocation.path + direction.directionChar,
            });
          }
          break;
        case "R":
          if (openChars.includes(hash[3])) {
            queue.push({
              x: newX,
              y: newY,
              path: currentLocation.path + direction.directionChar,
            });
          }
          break;

        default:
          break;
      }
    }
  }

  return null;
};

const solvePuzzle = (passcode) => {
  return findShortestPath({ x: 0, y: 0 }, { x: 3, y: 3 }, passcode);
};

const main = async () => {
  try {
    const input = "qljzarfv";

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
