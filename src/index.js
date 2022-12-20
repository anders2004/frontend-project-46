import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatDiff from './formaters/index.js';
import getDiff from './diff.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');

const getData = (filepath) => parse(readFile(filepath), path.extname(filepath).slice(1));

const gendiff = (filepath1, filepath2) => {
  const object1 = getData(filepath1);
  const object2 = getData(filepath2);

  return formatDiff(getDiff(object1, object2));
};

export default gendiff;

/* console.log(gendiff('../__fixtures__/file1.json', '../__fixtures__/file2.json')); */
