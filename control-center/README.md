# PaseTec – _Control Center_

[Electron](http://electronjs.org)-based app with [React](https://reactjs.org/) as frontend that connects to an [Arduino](https://www.arduino.cc/) using [SerialPort](https://serialport.io/).

## Setup

You'll need [Node](https://nodejs.org/en/) AND [Yarn](https://yarnpkg.com/en/) installed.

```bash
$ cd pasetec/control-center
$ yarn install
$ yarn electron-rebuild # More info in https://serialport.io/docs/guide-installation#electron
```

### File Structure

```
control-center/
|-- public/
  |-- electron.js
|-- src/
  |-- actions/
  |-- components/
  |-- App.js
|-- electron-builder.env
```

- **`public/`**: Public files of Create React App
- **`actions/`**: Is like 'pages'
- **`App.js`**: Create React App home
- **`electron-builder.env`**: There go the env vars. Follow `electron-builder.env.example` to create it
- **`electron.js`**: Electron code

## Running

When developing, you'll have two command-lines: one running the React server (`$ yarn start`) and another the Electron app (`$ yarn electron-dev`). To see the production app, only run `$ yarn electron` (it builds the React app and run Electron in production mode).

## Building

Run `$ yarn electron-build`. More info about it [here](https://www.electron.build/).
