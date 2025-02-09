// Function to calculate the sum of all divisors of a given number 'n'
const sumOfDivisors = (n) => {
  let sum = 0;

  // Iterate over possible divisors up to the square root of 'n'
  for (let i = 1; i * i <= n; i++) {
    // Check if 'i' is a divisor of 'n'
    if (n % i === 0) {
      sum += i; // Add the divisor 'i' to the sum
      // If 'i' is not the same as the paired divisor 'n / i', add the paired divisor
      if (i !== n / i) sum += n / i;
    }
  }
  return sum;
};

const findLowestHouse = (target) => {
  let house = 1;

  while (true) {
    // Calculate the number of presents delivered to the current house
    let presents = 10 * sumOfDivisors(house);

    // Check the number of presents
    if (presents >= target) {
      return house;
    }
    house++;
  }
};

const solvePuzzle = (input) => {
  return findLowestHouse(input);
};

const main = async () => {
  try {
    const input = 34000000;

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
