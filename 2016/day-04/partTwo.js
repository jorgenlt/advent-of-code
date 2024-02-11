import { readFile } from "fs/promises";

const alphabetShiftCipher = (char, id) => {
  const startNum = char.charCodeAt(0);

  // Handle positive shift within the range of the alphabet
  let shiftedNum = startNum + (id % 26);

  if (shiftedNum > 122) {
    // Handle wrapping around 'z'
    shiftedNum -= 26;
  } else if (shiftedNum < 97) {
    // Handle negative shift
    shiftedNum += 26;
  }

  const decrypted = String.fromCharCode(shiftedNum);

  return decrypted;
};

const findFiveMostCommonLetters = (str) => {
  const charCount = {};

  // Count occurrences of each character
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Convert the character count object to an array of [char, count] pairs
  const charCountArray = Object.entries(charCount);

  // Sort the array first by count in descending order, then alphabetically by character
  charCountArray.sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    } else {
      return a[0].localeCompare(b[0]);
    }
  });

  // Take the first five elements (most common letters)
  const mostCommonLetters = charCountArray.slice(0, 5).map((pair) => pair[0]);

  return mostCommonLetters;
};

const findRealRooms = (rooms) => {
  const realRooms = [];

  rooms.forEach((room) => {
    const nameWithHyphens = room.split(/\d+/)[0];
    const name = nameWithHyphens.replaceAll("-", "");
    const id = Number(room.match(/\d+/g));
    const checksum = room.split("[")[1].replace("]", "");

    const mostCommon = findFiveMostCommonLetters(name).join("");

    if (checksum === mostCommon) {
      realRooms.push({ name: nameWithHyphens, id });
    }
  });

  return realRooms;
};

const decryptRooms = (rooms) => {
  const decryptedRooms = [];

  rooms.forEach((room) => {
    const { name, id } = room;

    const decrypted = [];

    for (const char of name) {
      if (char === "-") {
        decrypted.push(" ");
      } else {
        decrypted.push(alphabetShiftCipher(char, id));
      }
    }

    decryptedRooms.push({
      name: decrypted.join("").replaceAll("-", " ").trim(),
      id,
    });
  });

  return decryptedRooms;
};

const main = async () => {
  try {
    const rooms = (await readFile("input.txt", "utf-8")).trim().split("\n");

    const realRooms = findRealRooms(rooms);

    const decryptedRooms = decryptRooms(realRooms);

    const northPoleStorageRoom = decryptedRooms.find((room) =>
      room.name.includes("northpole")
    );

    console.log("Northpole storage room sector ID:", northPoleStorageRoom.id);
  } catch (err) {
    console.error(err);
  }
};

main();
