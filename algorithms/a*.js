// Create a graph represented as a Map
// Each vertex maps to an array of its neighbors and their corresponding weights
const createGraph = () => new Map();

// Add a vertex to the graph
const addVertex = (graph, vertex) => {
  if (!graph.has(vertex)) {
    graph.set(vertex, []);
  }
};

// Add an edge to the graph
// Directed edge: vertex1 -> vertex2 with a given weight
const addEdge = (graph, vertex1, vertex2, weight) => {
  graph.get(vertex1).push({ node: vertex2, weight });
};

// Heuristic function to estimate the cost from a vertex to the goal
// In this example, we assume the heuristic is a simple function.
// Replace it with domain-specific logic (e.g., Euclidean distance for grids).
const heuristic = (a, b) => {
  // Example: Default heuristic is 0 for simplicity
  return 0;
};

// A* Algorithm Implementation
const aStar = (graph, start, goal) => {
  const openSet = [start]; // Set of nodes to evaluate
  const cameFrom = new Map(); // Map to reconstruct the shortest path
  const gScore = new Map(); // Cost from start to each node
  const fScore = new Map(); // Estimated total cost (gScore + heuristic)

  // Initialize gScore and fScore
  for (const vertex of graph.keys()) {
    gScore.set(vertex, Infinity); // Set all nodes' gScore to infinity initially
    fScore.set(vertex, Infinity); // Set all nodes' fScore to infinity initially
  }
  gScore.set(start, 0); // Cost of start node is 0
  fScore.set(start, heuristic(start, goal)); // fScore of start = heuristic(start, goal)

  while (openSet.length > 0) {
    // Get the node in openSet with the lowest fScore
    openSet.sort((a, b) => fScore.get(a) - fScore.get(b)); // Sort by fScore
    const current = openSet.shift(); // Dequeue the node with the lowest fScore

    // If the goal is reached, reconstruct the path
    if (current === goal) {
      const path = [];
      let temp = current;
      while (cameFrom.has(temp)) {
        path.push(temp);
        temp = cameFrom.get(temp);
      }
      path.push(start);
      return path.reverse(); // Return the shortest path
    }

    // Explore neighbors of the current node
    for (const { node: neighbor, weight } of graph.get(current)) {
      const tentativeGScore = gScore.get(current) + weight; // Calculate tentative gScore

      if (tentativeGScore < gScore.get(neighbor)) {
        // Update the path to this neighbor
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal)); // fScore = gScore + heuristic

        // Add neighbor to openSet if not already present
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // If no path is found, return an empty array
  return [];
};

// Example Usage:
// Create the graph
const graph = createGraph();

// Add vertices
addVertex(graph, "A");
addVertex(graph, "B");
addVertex(graph, "C");
addVertex(graph, "D");
addVertex(graph, "E");

// Add edges with weights
addEdge(graph, "A", "B", 1);
addEdge(graph, "A", "C", 3);
addEdge(graph, "B", "D", 1);
addEdge(graph, "C", "D", 1);
addEdge(graph, "D", "E", 5);

// Define a heuristic function (Example: zero heuristic for simplicity)
// const heuristic = (a, b) => 0;

// Find the shortest path from A to E
console.log(aStar(graph, "A", "E")); // Output: ['A', 'B', 'D', 'E']
