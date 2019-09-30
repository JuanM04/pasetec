[English](README.md) | Español

# PaseTec – _Centro de Control_

Aplicación de escritorio basada en [Electron](http://electronjs.org) con [React](https://reactjs.org/) en el frontend, que se conecta a un [Arduino](https://www.arduino.cc/) usando [SerialPort](https://serialport.io/).

## Preparación

Necesitás tener [Node](https://nodejs.org/en/) Y [Yarn](https://yarnpkg.com/en/) instalados.

```bash
# Si estás usando Windows
$ yarn global add windows-build-tools

$ cd pasetec/control-center
$ yarn install
$ yarn electron-rebuild # Más información en https://serialport.io/docs/guide-installation#electron
```

### Estructura de Archivos

```
control-center/
|-- public/
|-- utils/
  |-- listeners.js
  |-- pack.js
|-- src/
  |-- actions/
  |-- components/
  |-- App.js
|-- .env
|-- main.js
```

- **`public/`**: Archivos públicos de Create React App
- **`actions/`**: Son como 'páginas'
- **`App.js`**: Inicio de Create React App
- **`.env`**: Acá van las variables de entorno. Seguí `.env.example` para crearlo
- **`main.js`**: Código de Electron
- **`listeners.js`**: Peticiones de Electron a la API
- **`pack.js`**: Configuración de Electron Packager

## Desarrollo

Cuando estés desarrollando, necesitarás correr el servidor de React y el de Electron simultáneamente. Eso se logra ejecutando `$ yarn electron-dev`.

## Compilado

Aviso: debido al uso de módulos narivos, solo podés compilar para el mismo OS en el que estés desarrollando. Sin embargo, podés compilar para _ia32_ y _x64_. Para conseguir esto, hay una dependencia que reconstruirá los módulos nativos y otra que compilará: [Electron Rebuild](https://github.com/electron/electron-rebuild) y [Electron Packager](https://github.com/electron/electron-packager).

Para compilar, solo corré:
```bash
$ yarn electron-pack
```

Para compilar para una arquitectura distinta a la de tu PC:
```bash
$ yarn postinstall --arch=ARCH
$ yarn electron-pack --arch=ARCH
```
