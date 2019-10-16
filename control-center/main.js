const { app, BrowserWindow, ipcMain } = require('electron'),
  path = require('path'),
  isDev = require('electron-is-dev'),
  url = require('url'),
  SerialPort = require('serialport'),
  Readline = require('@serialport/parser-readline'),
  initListeners = require('./utils/listeners')

let mainWindow

// Create Window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.resolve(__dirname, 'icons/png/64x64.png'),
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:5000'
      : url.format({
          pathname: path.join(__dirname, 'build/index.html'),
          protocol: 'file:',
          slashes: true,
        })
  )

  if (isDev) mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', sendPorts)

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

// Electron code
app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})

// Code related to SerialPort
function sendPorts() {
  SerialPort.list()
    .then(ports => mainWindow.webContents.send('ports', ports))
    .catch(console.error)
}

ipcMain.on('get-ports', sendPorts)

ipcMain.on('use-port', (e, port) => {
  // An event listener to Serial
  const serial = new SerialPort(port, { baudRate: 115200 })
  const parser = serial.pipe(new Readline())

  parser.on('data', uid => {
    uid = uid.replace('\r', '')
    mainWindow.webContents.send('card-detected', uid)
  })
})

// Listeners
initListeners(ipcMain)
