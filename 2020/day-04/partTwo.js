import { readFile } from "fs/promises";

const isValid = (passport) => {
  if (passport.size < 7 || (!passport.has("cid") && passport.size < 7)) {
    return false;
  }

  let byr = false;
  let iyr = false;
  let eyr = false;
  let hgt = false;
  let hcl = false;
  let ecl = false;
  let pid = false;

  // byr
  const byrValue = passport.get("byr");
  if (byrValue && byrValue >= 1920 && byrValue <= 2002) {
    byr = true;
  }

  // iyr
  const iyrValue = passport.get("iyr");
  if (iyrValue && iyrValue >= 2010 && iyrValue <= 2020) {
    iyr = true;
  }

  // eyr
  const eyrValue = passport.get("eyr");
  if (eyrValue && eyrValue >= 2020 && eyrValue <= 2030) {
    eyr = true;
  }

  // hgt

  const hgtValue = passport.get("hgt");
  if (hgtValue) {
    const hgtMatch = hgtValue.match(/(\d+)(\w+)/);

    let height, unit;

    if (hgtMatch) {
      height = hgtMatch[1];
      unit = hgtMatch[2];
    }

    if ((!isNaN(height) && unit === "cm") || unit === "in") {
      if (unit === "cm" && Number(height) >= 150 && Number(height) <= 193) {
        hgt = true;
      }

      if (unit === "in" && Number(height) >= 59 && Number(height) <= 76) {
        hgt = true;
      }
    }
  }

  // hcl
  const hclValue = passport.get("hcl");
  if (hclValue && hclValue[0] === "#") {
    if (hclValue.length === 7) {
      const chars = hclValue.substring(1);
      const regex = /[0-9a-f]+/g;
      if (regex.test(chars)) {
        hcl = true;
      }
    }
  }

  // ecl
  const eclValue = passport.get("ecl");
  const eclPattern = /^(amb|blu|brn|gry|grn|hzl|oth)$/;
  if (eclValue && eclPattern.test(eclValue)) {
    ecl = true;
  }

  // pid
  const pidValue = passport.get("pid");
  if (pidValue && pidValue.length === 9) {
    pid = true;
  }

  return byr && iyr && eyr && hgt && hcl && ecl && pid;
};

const main = async () => {
  try {
    const input = (await readFile("input.txt", "utf-8"))
      .trim()
      .split("\n\n")
      .map((e) => {
        const passport = new Map();
        e.split(/[ \n]/g).forEach((field) => {
          const [key, value] = field.split(":");
          passport.set(key, value);
        });
        return passport;
      });

    let validCount = 0;

    input.forEach((passport) => {
      if (isValid(passport)) {
        validCount++;
      }
    });

    console.log(validCount);
  } catch (err) {
    console.error(err);
  }
};

main();
