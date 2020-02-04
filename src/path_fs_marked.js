const path = require('path');
const fs = require('fs');
const marked = require('marked');

const getAbsolutePath = route => ((path.isAbsolute(route) === true) ? route : path.resolve(route));

const isFile = route => fs.statSync(route).isFile();

const isMD = route => ((path.extname(route) === '.md'));

const readDirectory = route => fs.readdirSync(route);

const saveRoutesOfFiles = (route) => {
  let arrayOfFiles = [];
  const newRoute = getAbsolutePath(route);
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
  getAbsolutePath,
  isFile,
  isMD,
  readDirectory,
  saveRoutesOfFiles,
  readFile,
  getAllLinks,
};
