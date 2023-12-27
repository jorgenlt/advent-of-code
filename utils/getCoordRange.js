const getCoordRange = (start, end) => {
  let coords = [];
  let [x1, y1] = start.split(",");
  let [x2, y2] = end.split(",");

  x1 = parseInt(x1);
  y1 = parseInt(y1);
  x2 = parseInt(x2);
  y2 = parseInt(y2);

  if (x1 < x2) {
    for (let x = x1; x <= x2; x++) {
      if (y1 < y2) {
        for (let y = y1; y <= y2; y++) {
          coords.push(x + "," + y);
        }
      } else {
        for (let y = y1; y >= y2; y--) {
          coords.push(x + "," + y);
        }
      }
    }
  } else {
    // swap
    [x1, x2] = [x2, x1];
    [y1, y2] = [y2, y1];

    for (let x = x1; x >= x2; x--) {
      if (y1 < y2) {
        for (let y = y1; y <= y2; y++) {
          coords.push(x + "," + y);
        }
      } else {
        for (let y = y1; y >= y2; y--) {
          coords.push(x + "," + y);
        }
      }
    }
  }

  return coords;
};

export default getCoordRange;