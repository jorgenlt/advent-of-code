import { readFile } from "fs/promises";

const parseInput = (input) => {
  return input.split("\n").map((e) => e.split("-"));
};

const createConnectionsMap = connections => {
  const map = new Map();

  connections.forEach(connection => {
    const [c1, c2] = connection;

    
    if (!map.has(c1)) {
      map.set(c1, [c2])
    } else {
      map.get(c1).push(c2)
    }

    if (!map.has(c2)) {
      map.set(c2, [c1])
    } else {
      map.get(c2).push(c1)
    }
  })

  return map
}

const solvePuzzle = (input) => {
  const connections = parseInput(input)

  const connectionsMap = createConnectionsMap(connections)
  
  const setsOfThree = new Set()

  connectionsMap.forEach((connections, c1) => {
    console.log(connections, c1)

    connections.forEach(connection => {
      
    })
  })


  return;
};

/*

Start by looking for sets of three computers where each 
computer in the set is connected to the other two computers.



*/

const main = async () => {
  try {
    const input = (await readFile("test.txt", "utf-8")).trim();

    console.log(solvePuzzle(input));
  } catch (err) {
    console.error(err);
  }
};

main();
