// from start [x1, y1] to end [x2, y2]
const calculateManhattanDistance = (a, b) => {
  let distance = 0;
  const dimensions = Math.max(a.length, b.length);
  for (var i = 0; i < dimensions; i++) {
    distance += Math.abs((b[i] || 0) - (a[i] || 0));
  }
  return distance;
};

export default calculateManhattanDistance;
