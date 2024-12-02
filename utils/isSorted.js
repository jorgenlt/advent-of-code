// Function to check if an array is already sorted in ascending or descending order
const isSorted = (arr) => {
  let ascending = true;
  let descending = true;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      ascending = false;
    }
    if (arr[i] > arr[i - 1]) {
      descending = false;
    }
  }

  return ascending || descending;
};

export default isSorted;
