const hasAdjacentDuplicates = (str) => {
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      return true; // Found adjacent duplicates
    }
  }
  return false; // No adjacent duplicates found
};

export default hasAdjacentDuplicates;
