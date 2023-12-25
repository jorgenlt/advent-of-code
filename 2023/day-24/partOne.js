import fs from "fs/promises";

// Function to find all pairs in an array
const findPairs = (arr) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs;
};

// Function to calculate time given initial position, velocity, and position
const getTime = (s, v, p) => {
  return (p - s) / v;
};

// Function to check if a point of intersection is valid within a specified test area
const isPointOfIntersectValid = (
  testAreaMin,
  testAreaMax,
  x1,
  y1,
  x2,
  y2,
  x3,
  y3,
  x4,
  y4
) => {
  // Calculate the denominator for finding the intersection point
  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // If the denominator is zero, the lines are parallel and there is no valid intersection
  if (denom === 0) {
    return false;
  }

  // Calculate 'ua', uniform parameter, to find the intersection point
  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;

  // Calculate intersection point coordinates
  const x = x1 + ua * (x2 - x1);
  const y = y1 + ua * (y2 - y1);

  const intersection = { x, y };

  // Check if the intersection point is within the specified test area
  if (
    intersection.x < testAreaMin ||
    intersection.x > testAreaMax ||
    intersection.y < testAreaMin ||
    intersection.y > testAreaMax
  ) {
    return false;
  }

  // Calculate times for each line segment
  const time1 = getTime(x1, x2 - x1, intersection.x);
  const time2 = getTime(x3, x4 - x3, intersection.x);

  // Check if the times are non-negative, indicating valid intersections
  if (time1 < 0 || time2 < 0) {
    return false;
  }

  // Valid intersection
  return true;
};

const main = async () => {
  try {
    const input = (await fs.readFile("input.txt", "utf8"))
      .trim()
      .split("\n")
      .map((line) =>
        line.split("@").map((e) => e.trim().split(", ").map(Number))
      );

    // Generate all possible pairs from the input data
    const allPairs = findPairs(input);

    const testArea = {
      min: 200000000000000,
      max: 400000000000000,
    };

    let intersectionsCount = 0;

    allPairs.forEach((pair) => {
      const [x1, y1] = pair[0][0];
      const [x2, y2] = [x1 + pair[0][1][0], y1 + pair[0][1][1]];
      const [x3, y3] = pair[1][0];
      const [x4, y4] = [x3 + pair[1][1][0], y3 + pair[1][1][1]];

      if (
        isPointOfIntersectValid(
          testArea.min,
          testArea.max,
          x1,
          y1,
          x2,
          y2,
          x3,
          y3,
          x4,
          y4
        )
      ) {
        intersectionsCount++;
      }
    });

    console.log(intersectionsCount);
  } catch (err) {
    console.error(err);
  }
};

main();
