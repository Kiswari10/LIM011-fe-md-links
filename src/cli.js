#!/usr/bin/env node

const mdLinks = require('./functionCli');
/* eslint-disable no-console */

const path = process.argv[2];
const [,,, ...option] = process.argv;
const options = option.join(' ');

mdLinks(path, options)
  .then((response) => {
    console.log(response);
  });
