#!/usr/bin/env node

import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .version('1.0.0', '-v, --version', 'output the version number')
  .description('Usage: gendiff [options]')
  .description('Compare two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'default')
  .action((filepath1, filepath2, options) => {
    console.log(gendiff(filepath1, filepath2, options.format));
  })
  .parse();
