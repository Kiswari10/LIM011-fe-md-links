/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const typeOfPath = (route) => {
  if (path.isAbsolute(route) === true) {
    return route;
  }
  return path.resolve(route);
};
// console.log(typeOfPath('./'));

const isFile = route => fs.statSync(route).isFile();

// console.log(isFile('/home/kiswari/Desktop/firestore_prueba/app.js'));

const isMD = (route) => {
  if (path.extname(route) === '.md') {
    return true;
  }
  return false;
};

// console.log(isMD('/home/kiswari/Desktop/pruebasKis/README.md'));

module.exports = {
  typeOfPath,
  isFile,
  isMD,
};
