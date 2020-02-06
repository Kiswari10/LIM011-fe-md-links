const path = require('path');
const validateLinks = require('../src/validate');
const stats = require('../src/stats');
const mdLinks = require('../src/md-links');
const functionCli = require('../src/functionCli');
const fetchMock = require('../__mocks__/node-fetch');

fetchMock
  .mock('https://es.wikipedia.org/wiki/Markdown', 200)
  .mock('https://nodejs.org/api/fs.html', 200)
  .mock('https://nodejs.org/hi', 404);

const fourthOutput = [{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown definition',
  file:
        path.join(process.cwd(), 'test', 'folder_example', 'folder_one', 'links.md'),
},
{
  href: 'https://nodejs.org/api/fs.html',
  text: 'file system',
  file:
        path.join(process.cwd(), 'test', 'folder_example', 'folder_one', 'links.md'),
},
{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file:
        path.join(process.cwd(), 'test', 'folder_example', 'readme.md'),
},
{
  href: 'https://nodejs.org/hi',
  text: 'Node.js',
  file:
        path.join(process.cwd(), 'test', 'folder_example', 'readme.md'),
}];

const fifthOutput = [{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown definition',
  file:
        path.join(process.cwd(), 'test', 'folder_example', 'folder_one', 'links.md'),
  status: 200,
  status_message: 'ok',
},
{
  href: 'https://nodejs.org/api/fs.html',
  text: 'file system',
  file:
        path.join(process.cwd(), 'test', 'folder_example', 'folder_one', 'links.md'),
  status: 200,
  status_message: 'ok',
},
{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file:
        path.join(process.cwd(), 'test', 'folder_example', 'readme.md'),
  status: 200,
  status_message: 'ok',
},
{
  href: 'https://nodejs.org/hi',
  text: 'Node.js',
  file:
        path.join(process.cwd(), 'test', 'folder_example', 'readme.md'),
  status: 404,
  status_message: 'fail',
}];

describe('validateLinks', () => {
  it('debería retornar un array de objetos con 5 propiedades: href, text, file, mensaje y status ', (done) => {
    expect.assertions(1);
    return validateLinks(path.join(process.cwd(), 'test', 'folder_example')).then((data) => {
      expect(data).toEqual(fifthOutput);
      done();
    });
  });
});

const sixthOutput = { total: 4, uniques: 3, broken: 1 };

describe('stats', () => {
  it('debería retornar un objeto con 3 propiedades: total, uniques y broken', (done) => {
    expect.assertions(1);
    return stats(path.join(process.cwd(), 'test', 'folder_example')).then((data) => {
      expect(data).toEqual(sixthOutput);
      done();
    });
  });
});

describe('mdLinks', () => {
  it('debería retornar un array de objetos con 5 propiedades', (done) => {
    expect.assertions(1);
    return mdLinks(path.join(process.cwd(), 'test', 'folder_example'), { validate: true }).then((data) => {
      expect(data).toEqual(fifthOutput);
      done();
    });
  });
  it('debería retornar un array de objetos con 3 propiedades', (done) => {
    expect.assertions(1);
    return mdLinks(path.join(process.cwd(), 'test', 'folder_example'), { validate: false }).then((data) => {
      expect(data).toEqual(fourthOutput);
      done();
    });
  });
  it('debería retornar un array de objetos con 3 propiedades por defecto', (done) => {
    expect.assertions(1);
    return mdLinks(path.join(process.cwd(), 'test', 'folder_example')).then((data) => {
      expect(data).toEqual(fourthOutput);
      done();
    });
  });
});

const seventhOutput = `${path.join(process.cwd(), 'test', 'folder_example', 'readme.md')} https://es.wikipedia.org/wiki/Markdown Markdown\n${
  path.join(process.cwd(), 'test', 'folder_example', 'readme.md')} https://nodejs.org/hi Node.js\n`
+ '';

const eighthOutput = `${path.join(process.cwd(), 'test', 'folder_example', 'readme.md')} https://es.wikipedia.org/wiki/Markdown ok 200 Markdown\n${
  path.join(process.cwd(), 'test', 'folder_example', 'readme.md')} https://nodejs.org/hi fail 404 Node.js\n`
+ '';

const ninthOutput = 'Total: 2\n'
+ 'Unique: 2';

const tenthOutput = 'Total: 2\n'
+ 'Unique: 2\n'
+ 'Broken: 1';

describe('functionCli', () => {
  it('debería retornar la informacion del link, el texto y el archivo al cual pertenece', (done) => {
    expect.assertions(1);
    return functionCli(path.join(process.cwd(), 'test', 'folder_example', 'readme.md')).then((data) => {
      expect(data).toEqual(seventhOutput);
      done();
    });
  });
  it('debería retornar la informacion del link, el texto, el archivo al cual pertenece y su status', (done) => {
    expect.assertions(1);
    return functionCli(path.join(process.cwd(), 'test', 'folder_example', 'readme.md'), '--validate').then((data) => {
      expect(data).toEqual(eighthOutput);
      done();
    });
  });
  it('debería retornar estadisticas con la cantidad de link totales y unicos', (done) => {
    expect.assertions(1);
    return functionCli(path.join(process.cwd(), 'test', 'folder_example', 'readme.md'), '--stats').then((data) => {
      expect(data).toEqual(ninthOutput);
      done();
    });
  });
  it('debería retornar estadisticas con la cantidad de link totales, unicos y rotos', (done) => {
    expect.assertions(1);
    return functionCli(path.join(process.cwd(), 'test', 'folder_example', 'readme.md'), '--stats --validate').then((data) => {
      expect(data).toEqual(tenthOutput);
      done();
    });
  });
});
