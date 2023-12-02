export const numberWordToNumber = (str) => {
  const numberWords = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];

  // Check if str is a numeric string and return its integer value
  if (!isNaN(str)) {
    return parseInt(str, 10);
  }

  // If str is a word number, find its index in the numberWords array
  let index = numberWords.indexOf(str.toLowerCase());

  // If the word number was found in the array, return its index
  if (index !== -1) {
    return index;
  }

  // If no conversion could be done, return NaN
  return NaN;
};
