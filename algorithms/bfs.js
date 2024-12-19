// Function to create a graph represented as a Map
// Each vertex (key) maps to an array of its neighbors (value)
const createGraph = () => new Map();

// Function to add a vertex to the graph
const addVertex = (graph, vertex) => {
  if (!graph.has(vertex)) {
    graph.set(vertex, []); // Initialize the vertex with an empty array of neighbors
  }
};

// Function to add an edge between two vertices
// For an undirected graph, both vertices are added to each other's adjacency list
const addEdge = (graph, vertex1, vertex2) => {
  graph.get(vertex1).push(vertex2); // Add vertex2 as a neighbor of vertex1
  graph.get(vertex2).push(vertex1); // Add vertex1 as a neighbor of vertex2 (omit for directed graphs)
};

// Function to perform Breadth-First Search (BFS) on the graph
const bfs = (graph, start) => {
  const visited = new Set(); // Keep track of visited vertices to avoid processing them multiple times
  const queue = [start]; // Initialize the queue with the starting vertex
  const result = []; // Store the order in which vertices are visited

  // Continue while there are vertices in the queue
  while (queue.length > 0) {
    const vertex = queue.shift(); // Dequeue the first vertex from the queue

    // If the vertex has not been visited yet
    if (!visited.has(vertex)) {
      visited.add(vertex); // Mark the vertex as visited
      result.push(vertex); // Add it to the result array

      // Iterate through the neighbors of the current vertex
      for (const neighbor of graph.get(vertex)) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor); // Add unvisited neighbors to the queue
        }
      }
    }
  }

  return result; // Return the list of visited vertices in BFS order
};

// Example Usage:

// Step 1: Create a graph
const graph = createGraph();

// Step 2: Add vertices to the graph
addVertex(graph, "A");
addVertex(graph, "B");
addVertex(graph, "C");
addVertex(graph, "D");
addVertex(graph, "E");
addVertex(graph, "F");

// Step 3: Add edges to the graph (undirected in this case)
addEdge(graph, "A", "B"); // Edge between A and B
addEdge(graph, "A", "C"); // Edge between A and C
addEdge(graph, "B", "D"); // Edge between B and D
addEdge(graph, "C", "E"); // Edge between C and E
addEdge(graph, "D", "E"); // Edge between D and E
addEdge(graph, "D", "F"); // Edge between D and F
addEdge(graph, "E", "F"); // Edge between E and F

// Step 4: Perform BFS starting from vertex 'A'
console.log(bfs(graph, "A"));
// Output: ['A', 'B', 'C', 'D', 'E', 'F']
