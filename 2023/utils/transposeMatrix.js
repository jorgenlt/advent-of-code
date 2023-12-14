export const transposeMatrix = (matrix) => {
  let transpose = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let row = [];
    for (let j = 0; j < matrix.length; j++) {
      row.push(matrix[j][i]);
    }

    transpose.push(row);
  }
  return transpose;
};
