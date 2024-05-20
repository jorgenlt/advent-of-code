  
import { readFile } from "fs/promises";

const main = async () => {
  try {
    const input = await readFile("test.txt", "utf-8");
    
    console.log(input);
  } catch (err) {
    console.error(err);
  }
};

main();
