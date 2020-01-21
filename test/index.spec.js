const route = require('../src/main');


describe('typeOfPath', () => {
  it('debería retornar una ruta absoluta', () => {
    expect(route.typeOfPath('/home/kiswari/Desktop/firestore_prueba')).toBe('/home/kiswari/Desktop/firestore_prueba');
  });
  it('debería retornar una ruta absoluta al pasarle una ruta relativa', () => {
    expect(route.typeOfPath('./')).toBe('/home/kiswari/Desktop/MD-Links/LIM011-fe-md-links');
  });
});

describe('isFile', () => {
  it('debería retornar true si la ruta es de un archivo', () => {
    expect(route.isFile('/home/kiswari/Desktop/firestore_prueba/app.js')).toBe(true);
  });
  it('debería retornar false si la ruta es de un directorio', () => {
    expect(route.isFile('/home/kiswari/Desktop/firestore_prueba')).toBe(false);
  });
});

describe('isMD', () => {
  it('debería retornar true si la ruta es de un archivo markdown (.md)', () => {
    expect(route.isMD('/home/kiswari/Desktop/pruebasKis/README.md')).toBe(true);
  });
  it('debería retornar false si la ruta es de un archivo con extension diferente a .md', () => {
    expect(route.isMD('/home/kiswari/Desktop/firestore_prueba/app.js')).toBe(false);
  });
});
