// Importing required modules
const fs = require('fs');
const process = require('process');

// Reading the file and trimming off any extra spaces
const D = fs.readFileSync(process.argv[2], 'utf-8').trim();
// Splitting the read data by newline character to get an array of rows
const L = D.split('\n');
// Further splitting each row into individual characters
const G = L.map(row => row.split(''));

// Defining a dynamic programming object to store intermediate results
const DP = {};

// Function f is a recursive function that calculates the number of ways to fill a grid with blocks
function f(dots, blocks, i, bi, current) {
    // Key for storing the result in DP object
    const key = [i, bi, current].toString();
    // If the result is already computed, return it
    if (DP[key] !== undefined) {
        return DP[key];
    }

    // If all dots are covered
    if (i === dots.length) {
        // If all blocks are used and there are no remaining cells
        if (bi === blocks.length && current === 0) {
            return 1;
        } 
        // If all but one block is used and the last block can fill the remaining cells
        else if (bi === blocks.length - 1 && blocks[bi] === current) {
            return 1;
        }
        // If the above conditions are not met, return 0 as the configuration is not valid
        else {
            return 0;
        }
    }

    // Initialize answer to 0
    let ans = 0;

    // Loop over possible cell states
    for (const c of ['.', '#']) {
        // If the current dot can be filled with the current cell state
        if (dots[i] === c || dots[i] === '?') {
            // If the cell is empty and there are no remaining cells in the current block
            if (c === '.' && current === 0) {
                ans += f(dots, blocks, i + 1, bi, 0);
            } 
            // If the cell is empty, there are remaining cells in the current block, and the current block can be completed
            else if (c === '.' && current > 0 && bi < blocks.length && blocks[bi] === current) {
                ans += f(dots, blocks, i + 1, bi + 1, 0);
            } 
            // If the cell is filled, there are remaining blocks, and the next block can be started
            else if (c === '#' && bi < blocks.length && blocks[bi] === current - 1) {
                ans += f(dots, blocks, i + 1, bi + 1, 1);
            }
        }
    }

    // Store the computed result in DP object
    DP[key] = ans;
    return ans;
}

// Example usage of the function with a grid G and blocks ['###', '##']
const result = f(G, ['###', '##'], 0, 0, 0);
console.log(result); // Logging the result
