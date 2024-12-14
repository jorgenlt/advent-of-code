const createGrid = (width, height, symbol) => {
  const grid = new Array(height).fill(null).map(() => new Array(width).fill(symbol));
  return grid;
}

export default createGrid;