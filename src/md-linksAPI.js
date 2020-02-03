const route = require('./main');
const validateLinks = require('./validate');

const mdLinks = (path, options) => {
  const allLinks = new Promise((resolve, reject) => {
    resolve(route.getAllLinks(path));
    reject(Error);
  });
  if (options.validate === false) {
    return allLinks;
  }
  return validateLinks(path);
};

module.exports = mdLinks;
