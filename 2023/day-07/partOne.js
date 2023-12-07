import { readLines } from "../utils/readLines.js";

const main = async () => {
  try {
    const hands = (await readLines("test.txt")).map((e) => {
      const hand = e.split(" ")[0];
      const bid = parseInt(e.split(" ")[1]);
      return [hand, bid];
    });

    // Sorting hands
    const sortedHands = sortHands(hands);

    // Calculating total winnings
    const winnings = totalWinnings(sortedHands);

    console.log("Total winnings:", winnings);
  } catch (err) {
    console.error(err);
  }
};

// Function to sort hands
const sortHands = (hands) => {
  return hands.sort((a, b) => {
    const handA = a[0];
    const handB = b[0];

    // Get counts of each card in hand
    const countsA = getCardCounts(handA);
    const countsB = getCardCounts(handB);

    // Get hand types
    const typeA = getHandType(countsA);
    const typeB = getHandType(countsB);

    // Sort by hand type strength
    if (typeA !== typeB) {
      return typeStrength(typeA) - typeStrength(typeB);
    }

    // If same type, sort by high card
    return compareHighCards(handA, handB);
  });
};

// Function to count the number of each card in the hand
const getCardCounts = (hand) => {
  // Count number of each card
  let counts = {};
  [...hand].forEach((card) => {
    if (!counts[card]) {
      counts[card] = 0;
    }
    counts[card]++;
  });
  return counts;
};

// Function to get the hand type based on card counts
const getHandType = (counts) => {
  let values = Object.values(counts);
  values.sort((a, b) => b - a);

  if (values[0] === 5) return "Five of a kind";
  if (values[0] === 4) return "Four of a kind";
  if (values[0] === 3 && values[1] === 2) return "Full house";
  if (values[0] === 3) return "Three of a kind";
  if (values[0] === 2 && values[1] === 2) return "Two pair";
  if (values[0] === 2) return "One pair";
  return "High card";
};

// Function to get the strength of a hand type
const typeStrength = (type) => {
  const strengths = {
    "Five of a kind": 7,
    "Four of a kind": 6,
    "Full house": 5,
    "Three of a kind": 4,
    "Two pair": 3,
    "One pair": 2,
    "High card": 1,
  };
  return strengths[type] || 0;
};

// Function to compare high cards in two hands
const compareHighCards = (a, b) => {
  let order = "AKQJT98765432";
  for (let i = 0; i < 5; i++) {
    if (order.indexOf(a[i]) > order.indexOf(b[i])) return -1;
    if (order.indexOf(a[i]) < order.indexOf(b[i])) return 1;
  }
  return 0;
};

// Function to calculate total winnings based on sorted hands
const totalWinnings = (hands) => {
  let sum = 0;
  hands.forEach((hand, i) => {
    const bid = hand[1];
    const rank = i + 1;
    sum += bid * rank;
  });
  return sum;
};

main();
