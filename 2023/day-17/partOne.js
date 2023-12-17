import fs from "fs/promises";

class WeightedGraph {
  numberNodes;
  adjacencyMatrix;

  constructor(numberNodes) {
    this.numberNodes = numberNodes;

    this.adjacencyMatrix = [];

    for (let i = 0; i < this.numberNodes; i++) {
      this.adjacencyMatrix[i] = new Array(this.numberNodes).fill(0);
    }
  }

  addEdge(node1, node2, weight) {
    this.adjacencyMatrix[node1][node2] = weight;
    this.adjacencyMatrix[node2][node1] = weight;
  }

  getNeighbors(node) {
    const neighbors = [];
    for (let i = 0; i < this.numberNodes; i++) {
      if (this.adjacencyMatrix[node][i] !== 0) {
        neighbors.push(i);
      }
    }
    return neighbors;
  }

  hasEdge(node1, node2) {
    if (
      node1 >= 0 &&
      node1 < this.numberNodes &&
      node2 >= 0 &&
      node2 < this.numberNodes
    ) {
      return (
        this.adjacencyMatrix[node1][node2] !== 0 &&
        this.adjacencyMatrix[node2][node1] !== 0
      );
    }

    return false;
  }

  removeEdge(node1, node2) {
    if (
      node1 >= 0 &&
      node1 < this.numberNodes &&
      node2 >= 0 &&
      node2 < this.numberNodes
    ) {
      this.adjacencyMatrix[node1][node2] = 0;
      this.adjacencyMatrix[node2][node1] = 0;
    }
  }
}

const buildWeightedGraph = (map) => {
  const rows = map.length;
  const cols = map[0].length;
  const graph = new WeightedGraph(rows * cols);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const currentVertex = i * cols + j;

      // Check and add edges for valid neighbors
      if (i > 0)
        graph.addEdge(
          currentVertex,
          (i - 1) * cols + j,
          parseInt(map[i - 1][j])
        );
      if (i < rows - 1)
        graph.addEdge(
          currentVertex,
          (i + 1) * cols + j,
          parseInt(map[i + 1][j])
        );
      if (j > 0)
        graph.addEdge(
          currentVertex,
          i * cols + (j - 1),
          parseInt(map[i][j - 1])
        );
      if (j < cols - 1)
        graph.addEdge(
          currentVertex,
          i * cols + (j + 1),
          parseInt(map[i][j + 1])
        );
    }
  }

  return graph;
};

// Edited Dijkstra algorithm function from: https://www.algorithms-and-technologies.com/dijkstra/javascript
const dijkstraAlgorithm = (graph, start) => {
  //This contains the distances from the start node to all other nodes
  var distances = Array(graph.numberNodes).fill(Number.MAX_VALUE);

  //The distance from the start node to itself is 0
  distances[start] = 0;

  // This contains whether a node was already visited
  const visited = Array(graph.numberNodes).fill(false);

  // While there are nodes left to visit...
  while (true) {
    // Find the node with the currently shortest distance from the start node
    let shortestDistance = Number.MAX_VALUE;
    let shortestIndex = -1;
    for (let i = 0; i < graph.numberNodes; i++) {
      // Go through all nodes that haven't been visited yet
      if (distances[i] < shortestDistance && !visited[i]) {
        shortestDistance = distances[i];
        shortestIndex = i;
      }
    }

    console.log(
      "Visiting node " +
        shortestIndex +
        " with current distance " +
        shortestDistance
    );

    if (shortestIndex === -1) {
      // There was no node not yet visited --> We are done
      return distances;
    }

    // For all neighboring nodes
    const neighbors = graph.getNeighbors(shortestIndex);
    for (let i = 0; i < neighbors.length; i++) {
      const neighborIndex = neighbors[i];
      const edgeWeight = graph.adjacencyMatrix[shortestIndex][neighborIndex];

      // If the path over this edge is shorter
      if (
        edgeWeight !== 0 &&
        distances[neighborIndex] > distances[shortestIndex] + edgeWeight
      ) {
        // Save this path as the new shortest path
        distances[neighborIndex] = distances[shortestIndex] + edgeWeight;
        console.log(
          "Updating distance of node " +
            neighborIndex +
            " to " +
            distances[neighborIndex]
        );
      }
    }

    // Lastly, note that we are finished with this node
    visited[shortestIndex] = true;
    console.log("Visited nodes: " + visited);
    console.log("Currently lowest distances: " + distances);
  }
};

const main = async () => {
  try {
    const input = (await fs.readFile("test.txt", "utf-8")).trim();

    const lines = input.split("\n");

    // Building graph to use with the Dijkstra algorithm
    const graph = buildWeightedGraph(lines);

    const dijkstra = dijkstraAlgorithm(graph, 0);
    // console.log(graph);
    console.table(dijkstra);

  } catch (err) {
    throw err;
  }
};

main();
