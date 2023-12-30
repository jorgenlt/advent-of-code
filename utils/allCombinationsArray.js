// Returns a 2D array of all possible combinations
const allCombinationsArray = (arr) => {
  const combinations = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      combinations.push([arr[i], arr[j]]);
      combinations.push([arr[j], arr[i]]);
    }
  }
  return combinations;
};

export default allCombinationsArray;