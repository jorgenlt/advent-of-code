import { readFile } from "fs/promises";
import transposeMatrix from "../../utils/transposeMatrix.js";

const parseInput = (input) => {
  input = input.trim().split("\n\n");

  const numbers = input[0].split(",");

  const boards = input
    .slice(1)
    .map((e) =>
      e.split("\n").map((f) => f.trim().replaceAll("  ", " ").split(" "))
    );

  return [numbers, boards];
};

const markWinnerNumbers = (numbers, board) => {
  const markedBoard = board.map((row) => {
    return row.map((boardNum) => {
      if (numbers.includes(boardNum)) {
        return "x";
      } else {
        return boardNum;
      }
    });
  });
  return markedBoard;
};

const allEqual = (arr) => arr.every((v) => v === arr[0]);

const isWinner = (markedBoard) => {
  // Check rows
  for (let i = 0; i < markedBoard.length; i++) {
    const row = markedBoard[i];
    if (allEqual(row)) {
      return true;
    }
  }

  // Check cols
  const transposed = transposeMatrix(markedBoard);
  for (let i = 0; i < transposed.length; i++) {
    const col = transposed[i];
    if (allEqual(col)) {
      return true;
    }
  }

  return false;
};

const sumBoard = (board) => {
  let sum = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (!isNaN(parseInt(board[i][j]))) {
        sum += parseInt(board[i][j]);
      }
    }
  }

  return sum;
};

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");

    const [numbers, boards] = parseInput(input);

    const currentNums = [];

    for (let i = 0; i < numbers.length; i++) {
      const num = numbers[i];
      currentNums.push(num);

      // For each number, check every board
      for (let j = 0; j < boards.length; j++) {
        const board = boards[j];

        const markedBoard = markWinnerNumbers(currentNums, board);

        if (isWinner(markedBoard)) {
          const boardSum = sumBoard(markedBoard);

          console.log(boardSum * num);

          return;
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

main();
