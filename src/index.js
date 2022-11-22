import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parser.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');

const getData = (filepath) => parse(readFile(filepath), path.extname(filepath).slice(1));

const gendiff = (filepath1, filepath2) => {
  const object1 = getData(filepath1);
  const object2 = getData(filepath2);
  const commonKeys = _.union(Object.keys(object1), Object.keys(object2)).sort();

  const diff = commonKeys.reduce((acc, key) => {
    if (!Object.hasOwn(object1, key)) {
      /* added */
      return [...acc, ['+', `${key}:`, object2[key]]];
    }
    if (!Object.hasOwn(object2, key)) {
      /* removed */
      return [...acc, ['-', `${key}:`, object1[key]]];
    }
    if (object1[key] !== object2[key]) {
      /* changed */
      return [...acc, ['-', `${key}:`, object1[key]], ['+', `${key}:`, object2[key]]];
    }
    /* unchanged */
    return [...acc, [' ', `${key}:`, object1[key]]];
  }, []);

  const diffString = diff.map((field) => field.join(' '));

  const result = `{\n  ${diffString.join('\n  ')}\n}`;

  return result;
};

export default gendiff;

console.log(gendiff('../../extra/file1.json', '../../extra/file2.json'));
