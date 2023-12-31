// Function to check if two words are anagrams of each other
const isAnagram = (word1, word2) => {
  if (word1.length !== word2.length) {
    return false;
  }

  // Sort the characters of both words and compare them
  const sortedWord1 = word1.split("").sort().join("");
  const sortedWord2 = word2.split("").sort().join("");

  return sortedWord1 === sortedWord2;
};

export default isAnagram;