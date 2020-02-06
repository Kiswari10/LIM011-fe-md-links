# Markdown Links

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Md-links es una librería que se desarrolló con la finalidad de leer y analizar archivos de formato Markdown ('.md) tomando en cuenta una ruta dada. Esta herramienta permite verificar los links que se encuentran dentro de los archivos y reportar estadísticas acerca del total de links, asi como la cantidad de links únicos y rotos. Esta librería se ha implementado usando [Node.js](https://nodejs.org/). 

## Diagrama de Flujo

![Diagrama de flujo](https://github.com/Kiswari10/LIM011-fe-md-links/blob/master/img/Diagrama%20de%20flujo%20-%20Md%20links.png)


## Planificación del proyecto

![Planificacion](https://github.com/Kiswari10/LIM011-fe-md-links/blob/master/img/Planificaci%C3%B3n-Trello.png)

[Enlace a Trello - Planificación completa](https://trello.com/invite/b/yKCon9nH/d5c2ffaee6d98acbb684e779e1b7b51d/md-links)

## Instalación y guía de uso de la librería

#### 1 - INSTALACIÓN

Para comenzar a usar este proyecto, lo primero que debe hacer es instalar la librería. 
Para ello ejecute en la terminal la siguiente línea de comando: 

`npm install kiswari10/md-links`

#### 2 - GUÍA DE USO

Esta libreria puede usarse de dos formas:

##### Importando el módulo con require para usarlo programáticamente:

```js
const mdLinks = require("md-links");
```
##### Ejecutándolo de la siguiente manera a través de la terminal:

`md-links <path-to-file> [options]`

Donde:

- path-to-file: Es la ruta absoluta o relativa al archivo o directorio que se desea analizar.
- Options: Se tiene las siguientes opciones para ejecutar en la linea de comando: `--validate`, `--stats`,`--stats` y `--validate` juntos.

## Documentación técnica de la librería

### API

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Tipo de dato string que representa la ruta absoluta o relativa al archivo o directorio. 
  Si la ruta pasada es relativa, se resuelve como relativa al directorio desde donde se invoca
  node - _current working directory_).
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función retorna una promesa (`Promise`) que resuelve un arreglo
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparece dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

Carga el módulo vía require:

```js
const mdLinks = require("md-links");
```
Retorno por defecto:

```js
mdLinks('test').then(data => console.log(data));
```
O tambien puede usar la opcion de validate: false,

```js
mdLinks('test', { validate: false }).then(data => console.log(data));
```
En ambos casos el resultado es:

![Resultado por defecto](https://github.com/Kiswari10/LIM011-fe-md-links/blob/master/img/mdLinks-whitoutValidate.png)

Para validación de los links:

```js
mdLinks('test', { validate: true }).then(data => console.log(data));
```
![Resultado con validación de links](https://github.com/Kiswari10/LIM011-fe-md-links/blob/master/img/mdLinks-whitValidate.png)

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación se ejecuta de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

![Resultado al ejecutar CLI](https://github.com/Kiswari10/LIM011-fe-md-links/blob/master/img/CLI.png)

El comportamiento por defecto no valida si las URLs responden ok o no,
solo identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analiza el archivo Markdown e imprime los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link.

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces considera el link como ok.

Por ejemplo:

![Resultado al ejecutar --validate](https://github.com/Kiswari10/LIM011-fe-md-links/blob/master/img/CLI-withValidate.png)

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

![Resultado al ejecutar --stats](https://github.com/Kiswari10/LIM011-fe-md-links/blob/master/img/CLI-withStats.png)

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

![Resultado al ejecutar --stats --validate](https://github.com/Kiswari10/LIM011-fe-md-links/blob/master/img/CLI-withStatsValidate.png)

## Objetivos de aprendizaje

Recuerda colocar en esta seccion los objetivos de aprendizaje que quedaron 
pendientes de tu proyecto anterior.

### Javascript
- [ ] Uso de callbacks
- [ ] Consumo de Promesas
- [ ] Creacion de Promesas
- [ ] Modulos de Js
- [ ] Recursión

### Node
- [ ] Sistema de archivos
- [ ] package.json
- [ ] crear modules
- [ ] Instalar y usar modules
- [ ] npm scripts
- [ ] CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- [ ] Testeo de tus funciones
- [ ] Testeo asíncrono
- [ ] Uso de librerias de Mock
- [ ] Mocks manuales
- [ ] Testeo para multiples Sistemas Operativos

### Git y Github
- [ ] Organización en Github

### Buenas prácticas de desarrollo
- [ ] Modularización
- [ ] Nomenclatura / Semántica
- [ ] Linting

***
