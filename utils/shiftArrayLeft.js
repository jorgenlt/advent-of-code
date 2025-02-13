const shiftArrayLeft = (arr, steps) => {
  const offset = steps % arr.length;
  return [...arr.slice(offset), ...arr.slice(0, offset)];
};

export default shiftArrayLeft;
