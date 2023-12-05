import fs from 'fs/promises';

export const readFile = async (filename) => {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return data;
  } catch (err) {
    throw err; 
  }
};
