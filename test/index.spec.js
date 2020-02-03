const path = require('path');
const route = require('../src/main');

describe('typeOfPath', () => {
  it('debería retornar una ruta absoluta', () => {
    expect(route.typeOfPath(path.join(process.cwd(), 'src'))).toBe(path.join(process.cwd(), 'src'));
  });
  it('debería retornar una ruta absoluta al pasarle una ruta relativa', () => {
    expect(route.typeOfPath('./')).toBe(process.cwd());
  });
});

describe('isFile', () => {
  it('debería retornar true si la ruta es de un archivo', () => {
    expect(route.isFile(path.join(process.cwd(), 'test', 'folder_example', 'app.js'))).toBe(true);
  });
  it('debería retornar false si la ruta es de un directorio', () => {
    expect(route.isFile(path.join(process.cwd(), 'test', 'folder_example'))).toBe(false);
  });
});

describe('isMD', () => {
  it('debería retornar true si la ruta es de un archivo markdown (.md)', () => {
    expect(route.isMD(path.join(process.cwd(), 'README.md'))).toBe(true);
  });
  it('debería retornar false si la ruta es de un archivo con extension diferente a .md', () => {
    expect(route.isMD(path.join(process.cwd(), 'package.json'))).toBe(false);
  });
});

const firstOutput = ['app.js', 'folder_one', 'index.html', 'readme.md', 'style.css'];

describe('readDirectory', () => {
  it('debería retornar un array con el contenido de la carpeta de la ruta', () => {
    expect(route.readDirectory(path.join(process.cwd(), 'test', 'folder_example'))).toEqual(firstOutput);
  });
});

const secondOutput = [path.join(process.cwd(), 'test', 'folder_example', 'folder_one', 'links.md'), path.join(process.cwd(), 'test', 'folder_example', 'readme.md')];

describe('saveRoutesOfFiles', () => {
  it('debería retornar un array con el contenido de la carpeta de la ruta', () => {
    expect(route.saveRoutesOfFiles(path.join(process.cwd(), 'test', 'folder_example'))).toEqual(secondOutput);
  });
});

const thirdOutput = '[Markdown definition](https://es.wikipedia.org/wiki/Markdown),\n'
+ '[módulos (CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html),\n'
+ '[file system](https://nodejs.org/api/fs.html),\n'
+ '[path](https://nodejs.org/api/path.html),\n'
+ '[http.get](https://nodejs.org/api/http.html#http_http_get_options_callback)';

describe('readFile', () => {
  it('debería retornar el contenido del documento de la ruta', () => {
    expect(route.readFile(path.join(process.cwd(), 'test', 'folder_example', 'folder_one', 'links.md'))).toEqual(thirdOutput);
  });
});

const fourthOutput = [{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown definition',
  file:
     '/home/kiswari/Desktop/MD-Links/LIM011-fe-md-links/test/folder_example/folder_one/links.md',
},
{
  href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
  text: 'módulos (CommonJS)',
  file:
     '/home/kiswari/Desktop/MD-Links/LIM011-fe-md-links/test/folder_example/folder_one/links.md',
},
{
  href: 'https://nodejs.org/api/fs.html',
  text: 'file system',
  file:
     '/home/kiswari/Desktop/MD-Links/LIM011-fe-md-links/test/folder_example/folder_one/links.md',
},
{
  href: 'https://nodejs.org/api/path.html',
  text: 'path',
  file:
     '/home/kiswari/Desktop/MD-Links/LIM011-fe-md-links/test/folder_example/folder_one/links.md',
},
{
  href:
     'https://nodejs.org/api/http.html#http_http_get_options_callback',
  text: 'http.get',
  file:
     '/home/kiswari/Desktop/MD-Links/LIM011-fe-md-links/test/folder_example/folder_one/links.md',
},
{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file:
     '/home/kiswari/Desktop/MD-Links/LIM011-fe-md-links/test/folder_example/readme.md',
},
{
  href: 'https://nodejs.org/hi',
  text: 'Node.js',
  file:
     '/home/kiswari/Desktop/MD-Links/LIM011-fe-md-links/test/folder_example/readme.md',
}];

describe('getAllLinks', () => {
  it('debería retornar el un array ', () => {
    expect(route.getAllLinks(path.join(process.cwd(), 'test', 'folder_example'))).toEqual(fourthOutput);
  });
});
