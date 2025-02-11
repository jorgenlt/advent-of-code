const dragonCurve = (data, minLength) => {
  if (data.length >= minLength) {
    return data;
  }
  const a = data;
  const b = data
    .split("")
    .reverse()
    .map((e) => (e === "1" ? "0" : "1"))
    .join("");
  const result = a + "0" + b;

  return dragonCurve(result, minLength);
};

const createCheckSum = (data) => {
  let checkSum = data;

  while (checkSum.length % 2 === 0) {
    let newChecksum = "";

    for (let i = 0; i < checkSum.length; i += 2) {
      const a = checkSum[i];
      const b = checkSum[i + 1];

      const result = a === b ? "1" : "0";

      newChecksum += result;
    }

    checkSum = newChecksum;
  }

  return checkSum;
};

const solvePuzzle = (initialState) => {
  const diskLength = 272;
  const data = dragonCurve(initialState, diskLength)
    .split("")
    .slice(0, diskLength)
    .join("");
  const checkSum = createCheckSum(data);

  return checkSum;
};

const main = async () => {
  try {
    const input = "11100010111110100";

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
