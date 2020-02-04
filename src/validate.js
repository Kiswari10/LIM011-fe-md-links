const fetch = require('node-fetch');
const allFunctions = require('./path_fs_marked');

const validateLinks = (route) => {
  const data = allFunctions.getAllLinks(route);
  const promises = [];
  data.forEach((element) => {
    promises.push(
      fetch(element.href)
        .then((res) => {
          let statusMessage;
          if (res.status >= 200 && res.status < 400) {
            statusMessage = 'ok';
          }
          if (res.status >= 400) {
            statusMessage = 'fail';
          }
          const obj = {
            href: element.href,
            text: element.text,
            file: element.file,
            status: res.status,
            status_message: statusMessage,
          };
          return obj;
        }),
    );
  });
  return Promise.all(promises);
};

module.exports = validateLinks;
