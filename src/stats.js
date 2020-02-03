const validateLinks = require('./validate');

const stats = path => validateLinks(path)
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
