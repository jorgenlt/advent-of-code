// Function to generate an array of numbers
const generateNumberArray = (from, to) => {
  let length = to - from + 1;
  let numbersArray = Array.from({ length }, (_, index) => index + from);
  return numbersArray;
}

export default generateNumberArray;