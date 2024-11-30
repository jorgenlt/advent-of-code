#!/bin/bash

# Create 25 directories named "day-01" to "day-25"
for i in $(seq -w 1 25); do
  dir_name="day-$i"
  mkdir "$dir_name"

  # Create an empty file called "test.txt" inside each folder
  touch "$dir_name/test.txt"

  # Create JavaScript files with specified content inside each folder
  js_content='
  
import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = await readFile("input.txt", "utf-8");
    
    console.log(input);
  } catch (err) {
    console.error(err);
  }
};

main();'

  echo "$js_content" >"$dir_name/partOne.js"
  echo "$js_content" >"$dir_name/partTwo.js"

  # Create a "readme.md" file with the correct day number in the link
  readme_content="[Puzzle](https://adventofcode.com/2024/day/$i)"
  echo "$readme_content" >"$dir_name/readme.md"
done

echo "Folders created."
