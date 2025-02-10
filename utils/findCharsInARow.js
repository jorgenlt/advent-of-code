// Function to check if a string contains any number of repititions of a char
const findCharsInARow = (str, repetitions) => {
  if (!str || !repetitions) {
    throw new Error("Missing arguments.");
  }

  const regex = new RegExp(`(.)\\1{${repetitions - 1}}`);
  const match = str.match(regex);
  return match ? match[1] : false;
};

export default findCharsInARow;
