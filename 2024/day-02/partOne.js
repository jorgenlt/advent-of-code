import { readFile } from "fs/promises";
import isSorted from "../../utils/isSorted.js";

const isReportValid = (report) => {
  let isValid = true;

  for (let j = 0; j < report.length; j++) {
    const prevLevel = j > 0 ? report[j - 1] : null;
    const currentLevel = report[j];

    if (prevLevel) {
      const diff = Math.abs(currentLevel - prevLevel);
      if (diff < 1 || diff > 3) {
        isValid = false;
      }
    }
  }

  return isValid;
};

const main = async () => {
  try {
    const reports = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((report) => report.split(" ").map(Number));

    let reportCount = reports.reduce((count, report) => {
      return isSorted(report) && isReportValid(report) ? count + 1 : count;
    }, 0);

    console.log(reportCount);
  } catch (err) {
    console.error(err);
  }
};

main();
