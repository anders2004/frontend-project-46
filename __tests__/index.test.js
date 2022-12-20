import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expected = readFile('comparison-result.txt');

test('compare nested JSON files', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toBe(expected);
});

// test('compare nested YAML files', () => {
//   const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
//   expect(actual).toBe(expected);
// });
