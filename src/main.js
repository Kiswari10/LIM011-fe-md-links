const path = require('path');
const fs = require('fs');

const typeOfPath = (route) => {
  if (path.isAbsolute(route) === true) {
    return route;
  }
  return path.resolve(route);
};

const isFile = route => fs.statSync(route).isFile();


const isMD = (route) => {
  if (path.extname(route) === '.md') {
    return true;
  }
  return false;
};

const readDirectory = route => fs.readdirSync(route);

module.exports = {
  typeOfPath,
  isFile,
  isMD,
  readDirectory,
};
