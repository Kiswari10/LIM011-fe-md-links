const stats = require('./stats');
const mdLinks = require('./md-links');

const functionCli = (path, options) => {
  if (options === '--validate') {
    return mdLinks(path, { validate: true })
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
      .then(data => `Total: ${data.total}\nUnique: ${data.uniques}`);
  }
  if (options === '--stats --validate') {
    return stats(path)
      .then(data => `Total: ${data.total}\nUnique: ${data.uniques}\nBroken: ${data.broken}`);
  }
  return mdLinks(path, { validate: false })
    .then((data) => {
      let string = '';
      data.forEach((element) => {
        string += `${element.file} ${element.href} ${element.text}\n`;
      });
      return string;
    });
};

module.exports = functionCli;
