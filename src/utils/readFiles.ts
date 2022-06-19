import fs from 'fs';
import path from 'path';
const fsPromises = fs.promises;

const readFiles = async (dir: string, files: string[]) => {
  const items = await fsPromises.readdir(
    path.join(__dirname, '..', `/${dir}`),
    {
      withFileTypes: true,
    }
  );

  for (const item of items) {
    if (item.isDirectory()) {
      await readFiles(`${dir}/${item.name}`, files);
    } else {
      files.push(path.join(__dirname, '..', `${dir}/${item.name}`));
    }
  }
};

export default readFiles;
