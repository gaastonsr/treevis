#!/usr/bin/env node

const minimist = require('minimist');
const { treeFromArray, treeToASCII } = require('./tree');

const argv = minimist(process.argv.slice(2));

if (argv._.length !== 1) {
  console.log('Usage: treevis <array>')
}

const array = JSON.parse(argv._[0]);

treeToASCII(treeFromArray(array));
