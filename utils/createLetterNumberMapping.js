// Function to create an object with letters a-z mapped to numbers 1-26 and A-Z mapped to numbers 27-52
const createLetterNumberMapping = () => {
  const letterNumberMapping = {};

  for (let i = 97; i <= 122; i++) {
    letterNumberMapping[String.fromCharCode(i)] = i - 96;
  }

  for (let i = 65; i <= 90; i++) {
    letterNumberMapping[String.fromCharCode(i)] = i - 38;
  }

  return letterNumberMapping;
};

export default createLetterNumberMapping;