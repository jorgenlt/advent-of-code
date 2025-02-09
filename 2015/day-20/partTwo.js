// Function to calculate the sum of all divisors of a given number 'n'
// that are less than or equal to 'limit'
const sumOfDivisors = (n, limit) => {
  let sum = 0;

  // Iterate over possible divisors from 1 up to the square root of 'n'
  for (let i = 1; i * i <= n; i++) {
    // Check if 'i' is a divisor of 'n'
    if (n % i === 0) {
      // If the quotient 'n / i' is within the limit, add 'i' to the sum
      if (n / i <= limit) sum += i;
      // If 'i' is not equal to 'n / i' and 'i' is within the limit, add 'n / i' to the sum
      if (i !== n / i && i <= limit) sum += n / i;
    }
  }

  return sum;
};

const findLowestHouse = (target) => {
  let house = 1;

  while (true) {
    // Calculate the number of presents delivered to the current house
    let presents = 11 * sumOfDivisors(house, 50);

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
