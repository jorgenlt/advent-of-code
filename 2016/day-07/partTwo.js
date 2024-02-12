import { readFile } from "fs/promises";

const getSequences = (ip) => {
  const outsideBrackets = [];
  const insideBrackets = [];

  ip.split(/[\[\]]/g).forEach((seq, i) => {
    if (i % 2 === 0) {
      outsideBrackets.push(seq);
    } else {
      insideBrackets.push(seq);
    }
  });

  return [outsideBrackets, insideBrackets];
};

const getAbas = (str) => {
  const abas = [];

  for (let i = 2; i < str.length; i++) {
    const char1 = str[i - 2];
    const char2 = str[i - 1];
    const char3 = str[i];

    if (char1 !== char2 && char1 === char3) {
      abas.push(char1 + char2 + char3);
    }
  }

  return abas;
};

const getAbasFromOutsideBrackets = (outsideBrackets) => {
  const abas = [];

  outsideBrackets.forEach((str) => {
    const abasFromStr = getAbas(str);

    if (abasFromStr.length > 0) {
      abas.push(...abasFromStr);
    }
  });

  return abas;
};

const hasBab = (insideBrackets, aba) => {
  const [char1, char2] = aba.split("");
  const bab = char2 + char1 + char2;

  const foundBab = insideBrackets.some((str) => {
    return str.includes(bab);
  });

  return foundBab;
};

const doesSupportSsl = (ip) => {
  const [outsideBrackets, insideBrackets] = getSequences(ip);

  let supportSsl = false;

  const abas = getAbasFromOutsideBrackets(outsideBrackets);

  if (abas.length > 0) {
    abas.forEach((aba) => {
      if (hasBab(insideBrackets, aba)) {
        supportSsl = true;
      }
    });
  }

  return supportSsl;
};

const main = async () => {
  try {
    const ips = (await readFile("input.txt", "utf-8")).trim().split("\n");

    const ipCount = ips.reduce((count, ip) => {
      return doesSupportSsl(ip) ? count + 1 : count;
    }, 0);

    console.log(ipCount);
  } catch (err) {
    console.error(err);
  }
};

main();
