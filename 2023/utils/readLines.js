import fs from "fs";
import readline from "readline";

export const readLines = (filename) => {
  return new Promise((resolve, reject) => {
    let lines = [];
    let rl = readline.createInterface({
      input: fs.createReadStream(filename),
    });

    rl.on("line", (line) => {
      lines.push(line);
    });

    rl.on("close", () => {
      resolve(lines);
    });

    rl.on("error", (err) => {
      reject(err);
    });
  });
};