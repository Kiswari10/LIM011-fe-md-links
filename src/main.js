const path = require('path');
const fs = require('fs');
const marked = require('marked');

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
  if (isFile(newRoute)) {
    if (isMD(newRoute)) {
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

const readFile = route => fs.readFileSync(route, 'utf-8');

const getAllLinks = (route) => {
  const render = new marked.Renderer();
  const array = [];
  const data = saveRoutesOfFiles(route);
  data.forEach((File) => {
    render.link = (Href, title, Text) => {
      array.push({ href: Href, text: Text, file: File });
    };
    marked(readFile(File), { renderer: render });
  });
  return array;
};

module.exports = {
  typeOfPath,
  isFile,
  isMD,
  readDirectory,
  saveRoutesOfFiles,
  readFile,
  getAllLinks,
};
