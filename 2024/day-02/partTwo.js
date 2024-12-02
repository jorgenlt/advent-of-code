import { readFile } from "fs/promises";
import isSorted from "../../utils/isSorted.js";
import removeElementAtIndex from "../../utils/removeElementAtIndex.js";

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

    let reportCount = 0;

    for (let i = 0; i < reports.length; i++) {
      const report = reports[i];

      if (isSorted(report) && isReportValid(report)) {
        reportCount++;
        continue;
      }

      for (let j = 0; j < report.length; j++) {
        const newReport = removeElementAtIndex(report, j);
        if (isSorted(newReport) && isReportValid(newReport)) {
          reportCount++;
          break;
        }
      }
    }

    console.log(reportCount);
  } catch (err) {
    console.error(err);
  }
};

main();
