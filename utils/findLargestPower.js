// Function to find the largest power of any given number b
// that is less than or equal to a given number a
const findLargestPower = (a, b) => {
  if (b <= 1) {
    throw new Error("Base must be greater than 1");
  }

  let p = parseInt(Math.log(a) / Math.log(b), 10);
  return Math.pow(x, p);
};

export default findLargestPower;
