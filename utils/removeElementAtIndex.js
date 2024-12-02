const removeElementAtIndex = (arr, index) => {
  if (index < 0 || index >= arr.length) {
    throw new Error("Index out of bounds");
  }

  return arr.slice(0, index).concat(arr.slice(index + 1));
};

export default removeElementAtIndex;
