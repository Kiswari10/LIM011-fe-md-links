const mdLinks = require('./md-links');

const stats = path => mdLinks(path, { validate: true })
  .then((data) => {
    const arrayOfFails = data.filter(element => element.status_message === 'fail');
    const arrayOfhref = [];
    data.forEach(element => arrayOfhref.push(element.href));
    const uniques = new Set(arrayOfhref);
    const obj = {
      total: data.length,
      uniques: uniques.size,
      broken: arrayOfFails.length,
    };
    return obj;
  });

module.exports = stats;
