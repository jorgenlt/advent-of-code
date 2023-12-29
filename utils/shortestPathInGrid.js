const shortestPathInGrid = (start, end) => {

  const queue = [[start[0], start[1]]];
  const visited = new Set();
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  let steps = 0;
  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      if (x === end[0] && y === end[1]) {
        return steps;  
      }

      if (!visited.has(`${x},${y}`)) {

        visited.add(`${x},${y}`);

        for (let [dx, dy] of dirs) {
          queue.push([x + dx, y + dy]);
        }
      }
    }

    steps++;
  }

  return -1; 
};

export default shortestPathInGrid;