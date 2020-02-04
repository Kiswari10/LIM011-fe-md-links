const route = require('./path_fs_marked');
const validateLinks = require('./validate');

const mdLinks = (path, options) => {
  const allLinks = new Promise((resolve) => {
    resolve(route.getAllLinks(path));
  });
  if (options === undefined) {
    return allLinks;
  }
  if (options.validate === true) {
    return validateLinks(path);
  }
  return allLinks;
};

module.exports = mdLinks;
