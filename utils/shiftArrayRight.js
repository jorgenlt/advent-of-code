// Function to shift/rotate array n steps to the right
// F.ex. shiftArrayRight([".", "#", ".", "#", "."], 2) = ["#", ".", ".", "#", "."]
const shiftArrayRight = (arr, steps) => {
  const offset = steps % arr.length;
  return [...arr.slice(-offset), ...arr.slice(0, -offset)];
};

export default shiftArrayRight;