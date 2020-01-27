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

const firstOutput = ['app.js', 'index.html', 'links.md', 'readme.md', 'style.css'];

describe('readDirectory', () => {
  it('debería retornar un array con el contenido de la carpeta de la ruta', () => {
    expect(route.readDirectory(path.join(process.cwd(), 'test', 'folder_example'))).toEqual(firstOutput);
  });
});

const secondOutput = [path.join(process.cwd(), 'test', 'folder_example', 'links.md'), path.join(process.cwd(), 'test', 'folder_example', 'readme.md')];

describe('saveRoutesOfFiles', () => {
  it('debería retornar un array con el contenido de la carpeta de la ruta', () => {
    expect(route.saveRoutesOfFiles(path.join(process.cwd(), 'test', 'folder_example'))).toEqual(secondOutput);
  });
});
