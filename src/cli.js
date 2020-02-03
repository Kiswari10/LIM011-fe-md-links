#!/usr/bin/env node

const mdLinks = require('./md-links');
/* eslint-disable no-console */

const path = process.argv[2];
const options = process.argv[3];

mdLinks(path, options)
  .then((response) => {
    console.log(response);
  });


/* const [,, ...options] = process.argv;
// const options = process.argv[2];
console.log(`${options}`); */

/* mdLinks(path, { validate: true })
  .then((response) => {
    console.log(response);
  }); */
