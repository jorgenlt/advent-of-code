// Function to find the coordinates, [x, y], of any number
// in a 2d-grid that spirals outwards from 1 [0, 0]
// https://en.wikipedia.org/wiki/Ulam_spiral
/*
17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
*/
const findCoordsInUlamsSpiral = (number) => {
  // Special case: The center of the spiral is (0, 0) for number 1
  if (number === 1) {
    return [0, 0];
  }

  // Calculate the layer of the Ulam spiral where the given number is located
  let spiralLayer = Math.ceil((Math.sqrt(number) - 1) / 2);

  // Calculate the side length of the current layer
  let sideLength = 2 * spiralLayer + 1;

  // Calculate the largest number in the current layer of the Ulam spiral
  let largestInLayer = sideLength * sideLength;

  // Decrease the side length of the layer by 1 to get to the inner layer
  sideLength--;

  // Check in which side of the layer the number is located and calculate coordinates accordingly
  if (number >= largestInLayer - sideLength) {
    // Number is on the bottom side of the layer
    return [spiralLayer - (largestInLayer - number), -spiralLayer];
  } else {
    largestInLayer -= sideLength;
  }

  if (number >= largestInLayer - sideLength) {
    // Number is on the left side of the layer
    return [-spiralLayer, -spiralLayer + (largestInLayer - number)];
  } else {
    largestInLayer -= sideLength;
  }

  if (number >= largestInLayer - sideLength) {
    // Number is on the top side of the layer
    return [-spiralLayer + (largestInLayer - number), spiralLayer];
  } else {
    // Number is on the right side of the layer
    return [spiralLayer, spiralLayer - (largestInLayer - number - sideLength)];
  }
};

const ulamsSpiralCoords = (size) => {
  const ulamsCoords = [];

  for (let i = 1; i <= size; i++) {
    ulamsCoords.push(findCoordsInUlamsSpiral(i));
  }

  return ulamsCoords;
};

export default ulamsSpiralCoords;
