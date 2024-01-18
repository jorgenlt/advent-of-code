const hasStrictlyTwoAdjacentDuplicates = (str) => {
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      if (i === 0 || str[i] !== str[i - 1]) { // Check if it's the first pair of adjacent duplicates
        if (i === str.length - 2 || str[i + 1] !== str[i + 2]) { // Check if it's the last pair of adjacent duplicates
          return true;
        }
      }
    }
  }

  return false; // Return false if no pair of adjacent duplicates is found
};

export default hasStrictlyTwoAdjacentDuplicates;