#!/usr/bin/env node

/* eslint-disable no-console */

const route = require('./main');

const path = process.argv[2];

// console.log(route.typeOfPath(path));
// console.log(route.isFile(path));
console.log(route.isMD(path));
// console.log(path);
