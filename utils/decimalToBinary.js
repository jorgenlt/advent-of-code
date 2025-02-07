const decimalToBinary = (decimal) => {
  return (decimal >>> 0).toString(2);
};

export default decimalToBinary;
