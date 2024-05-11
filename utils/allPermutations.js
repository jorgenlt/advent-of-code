const allPermutations = (arr, memo = new Map()) => {
  if (memo.has(arr)) {
    return memo.get(arr);
  }

  if (arr.length === 1) {
    return [arr];
  }

  const permutations = [];
  const head = arr[0];
  const tails = allPermutations(arr.slice(1), memo);

  for (const tail of tails) {
    for (let i = 0; i <= tail.length; i++) {
      permutations.push([...tail.slice(0, i), head, ...tail.slice(i)]);
    }
  }

  memo.set(arr, permutations);
  return permutations;
};

export default allPermutations;
