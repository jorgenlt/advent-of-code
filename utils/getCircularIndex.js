const getCircularIndex = (index, arrayLength) => {
  // Use modulo to find the wrapped index
  const wrappedIndex = index % arrayLength;

  // If wrappedIndex is negative, adjust to get the positive index
  return wrappedIndex >= 0 ? wrappedIndex : wrappedIndex + arrayLength;
};

export default getCircularIndex;
