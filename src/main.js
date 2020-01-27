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

const saveRoutesOfFiles = (route) => {
  let arrayOfFiles = [];
  const newRoute = typeOfPath(route);
  if (isFile(newRoute) === true) {
    if (isMD(newRoute) === true) {
      arrayOfFiles.push(newRoute);
    }
  } else {
    const data = readDirectory(newRoute);
    data.forEach((elem) => {
      const addRoute = path.join(newRoute, elem);
      const file = saveRoutesOfFiles(addRoute);
      arrayOfFiles = arrayOfFiles.concat(file);
    });
  }
  return arrayOfFiles;
};

module.exports = {
  typeOfPath,
  isFile,
  isMD,
  readDirectory,
  saveRoutesOfFiles,
};
