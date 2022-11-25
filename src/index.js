import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import formatData from './formaters.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');

const getData = (filepath) => parse(readFile(filepath), path.extname(filepath).slice(1));

const gendiff = (filepath1, filepath2) => {
  const object1 = getData(filepath1);
  const object2 = getData(filepath2);
  const commonKeys = _.union(Object.keys(object1), Object.keys(object2)).sort();

  const diff = commonKeys.map((key) => {
    if (!Object.hasOwn(object1, key)) {
      return { key, value: object2[key], type: 'added' };
    }
    if (!Object.hasOwn(object2, key)) {
      return { key, value: object1[key], type: 'removed' };
    }
    if (object1[key] !== object2[key]) {
      return {
        key,
        valueOld: object1[key],
        valueNew: object2[key],
        type: 'changed',
      };
    }
    return { key, value: object1[key], type: 'unchanged' };
  });
  return formatData(diff);
};

export default gendiff;

/*console.log(gendiff('../__fixtures__/file1.json', '../__fixtures__/file2.json'));*/
