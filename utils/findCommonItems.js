// Function to find common items in n arrays
const findCommonItems = (...arrays) => {
  return arrays.reduce((accumulator, currentArray) => {
    return accumulator.filter((item) => currentArray.includes(item));
  });
};

export default findCommonItems;
