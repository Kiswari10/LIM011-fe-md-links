const validateLinks = require('./validate');
const stats = require('./stats');

const mdLinks = (path, options) => {
  if (options === '--validate') {
    return validateLinks(path)
      .then((data) => {
        let string = '';
        data.forEach((element) => {
          string += `${element.file} ${element.href} ${element.status_message} ${element.status} ${element.text}\n`;
        });
        return string;
      });
  }
  if (options === '--stats') {
    return stats(path)
      .then((data) => {
        const string = `Total: ${data.total}\nUnique: ${data.uniques}`;
        return string;
      });
  }
  if (options === '--stats --validate') {
    return stats(path)
      .then((data) => {
        const string = `Total: ${data.total}\nUnique: ${data.uniques}\nBroken: ${data.broken}`;
        return string;
      });
  }
  return validateLinks(path)
    .then((data) => {
      let string = '';
      data.forEach((element) => {
        string += `${element.file} ${element.href} ${element.text}\n`;
      });
      return string;
    });
};

module.exports = mdLinks;
