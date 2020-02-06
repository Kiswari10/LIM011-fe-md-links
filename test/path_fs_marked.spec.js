const path = require('path');
const route = require('../src/path_fs_marked');

describe('getAbsolutePath', () => {
  it('debería retornar una ruta absoluta', () => {
    expect(route.getAbsolutePath(path.join(process.cwd(), 'src'))).toBe(path.join(process.cwd(), 'src'));
  });
  it('debería retornar una ruta absoluta al pasarle una ruta relativa', () => {
    expect(route.getAbsolutePath('.')).toBe(process.cwd());
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
  it('debería retornar un array con la(s) ruta(s) de lo(s) archivo(s) markdown', () => {
    expect(route.saveRoutesOfFiles(path.join(process.cwd(), 'test', 'folder_example'))).toEqual(secondOutput);
  });
});

const thirdOutput = '[Markdown definition](https://es.wikipedia.org/wiki/Markdown),\n'
+ '[file system](https://nodejs.org/api/fs.html)';

describe('readFile', () => {
  it('debería retornar el contenido del documento de la ruta', () => {
    expect(route.readFile(path.join(process.cwd(), 'test', 'folder_example', 'folder_one', 'links.md'))).toEqual(thirdOutput);
  });
});

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

describe('getAllLinks', () => {
  it('debería retornar un array de objetos con 3 propiedades: href, text, file', () => {
    expect(route.getAllLinks(path.join(process.cwd(), 'test', 'folder_example'))).toEqual(fourthOutput);
  });
});
