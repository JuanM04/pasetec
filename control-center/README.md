English | [Español](README.es.md)

# PaseTec – _Control Center_

[Electron](http://electronjs.org)-based app with [React](https://reactjs.org/) as frontend that connects to an [Arduino](https://www.arduino.cc/) using [SerialPort](https://serialport.io/).

## Setup

You'll need [Node](https://nodejs.org/en/) AND [Yarn](https://yarnpkg.com/en/) installed.

```bash
# If you are using Windows
$ yarn global add windows-build-tools

$ cd pasetec/control-center
$ yarn install
```

### File Structure

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

- **`public/`**: Public files of Create React App
- **`actions/`**: Is like 'pages'
- **`App.js`**: Create React App home
- **`.env`**: There go the env vars. Follow `.env.example` to create it
- **`main.js`**: Electron code
- **`listeners.js`**: Electron requests to API
- **`pack.js`**: Electron Packager config

## Developing

When developing, you'll run the React server and the Electron app with the same command: `$ yarn electron-dev` or `$ yarn electron-dev-win`.

## Building

Disclaimer: because of the use of native modules, you can only build the app for the same OS you're using. However, you can build for both _ia32_ and _x64_. To achieve this, there are two dependencies that will rebuild the modules and other that will pack the app: [Electron Rebuild](https://github.com/electron/electron-rebuild) and [Electron Packager](https://github.com/electron/electron-packager).

To build the app, you just run this command:
```bash
$ yarn electron-pack
```

If you want to build for a arch different that the one you have on your computer:
```bash
$ yarn postinstall --arch=ARCH

$ ELECTRON_ARCH=ARCH yarn electron-pack # Unix
$ set ELECTRON_ARCH=ARCH ;; yarn electron-pack # Windows
```
