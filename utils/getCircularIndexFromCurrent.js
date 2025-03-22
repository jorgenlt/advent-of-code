const getCircularIndexFromCurrent = (currentIndex, offset, arrayLength) => {
  // Calculate the new index by adding the offset
  const newIndex = currentIndex + offset;

  // Use modulo to find the wrapped index
  const wrappedIndex = newIndex % arrayLength;

  // If wrappedIndex is negative, adjust to get the positive index
  return wrappedIndex >= 0 ? wrappedIndex : wrappedIndex + arrayLength;
};

export default getCircularIndexFromCurrent;
