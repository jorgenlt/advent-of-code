const getCoordRange = (start, end) => {
  let coords = [];
  let [x1, y1] = start.split(",");
  let [x2, y2] = end.split(",");

  x1 = parseInt(x1);
  y1 = parseInt(y1);
  x2 = parseInt(x2);
  y2 = parseInt(y2);

  let xIncrement = x1 < x2 ? 1 : -1;
  let yIncrement = y1 < y2 ? 1 : -1;

  for (let x = x1; x !== x2 + xIncrement; x += xIncrement) {
    for (let y = y1; y !== y2 + yIncrement; y += yIncrement) {
      coords.push(x + "," + y);
    }
  }

  return coords;
};

export default getCoordRange;