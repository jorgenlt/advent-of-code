const createGraph = () => new Map();

const addVertex = (graph, vertex) => {
  if (!graph.has(vertex)) {
    graph.set(vertex, []);
  }
};

const addEdge = (graph, vertex1, vertex2, weight) => {
  graph.get(vertex1).push({ node: vertex2, weight });
  graph.get(vertex2).push({ node: vertex1, weight });
};

const dijkstra = (graph, start, finish) => {
  const distances = new Map();
  const previous = new Map();
  const priorityQueue = [];
  const path = [];

  // Initialize distances and priority queue
  graph.forEach((_, vertex) => {
    if (vertex === start) {
      distances.set(vertex, 0);
      priorityQueue.push({ node: vertex, priority: 0 });
    } else {
      distances.set(vertex, Infinity);
      priorityQueue.push({ node: vertex, priority: Infinity });
    }
    previous.set(vertex, null);
  });

  const sortQueue = () => {
    priorityQueue.sort((a, b) => a.priority - b.priority);
  };

  while (priorityQueue.length > 0) {
    sortQueue();
    const { node: smallest } = priorityQueue.shift();

    if (smallest === finish) {
      let current = smallest;
      while (previous.get(current)) {
        path.push(current);
        current = previous.get(current);
      }
      path.push(start);
      return path.reverse();
    }

    if (distances.get(smallest) !== Infinity) {
      for (const { node: neighbor, weight } of graph.get(smallest)) {
        const candidate = distances.get(smallest) + weight;

        if (candidate < distances.get(neighbor)) {
          distances.set(neighbor, candidate);
          previous.set(neighbor, smallest);

          const queueItem = priorityQueue.find(
            (item) => item.node === neighbor
          );
          if (queueItem) queueItem.priority = candidate;
        }
      }
    }
  }

  return path; // Return an empty array if no path is found
};

// Example Usage:
const graph = createGraph();
addVertex(graph, "A");
addVertex(graph, "B");
addVertex(graph, "C");
addVertex(graph, "D");
addVertex(graph, "E");
addVertex(graph, "F");

addEdge(graph, "A", "B", 4);
addEdge(graph, "A", "C", 2);
addEdge(graph, "B", "E", 3);
addEdge(graph, "C", "D", 2);
addEdge(graph, "C", "F", 4);
addEdge(graph, "D", "E", 3);
addEdge(graph, "D", "F", 1);
addEdge(graph, "E", "F", 1);

console.log(dijkstra(graph, "A", "E")); // Output: ['A', 'C', 'D', 'F', 'E']
