const { app, BrowserWindow, ipcMain } = require('electron'),
  path = require('path'),
  isDev = require('electron-is-dev'),
  url = require('url'),
  SerialPort = require('serialport'),
  Readline = require('@serialport/parser-readline'),
  fetch = require('isomorphic-unfetch')

let mainWindow

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

// Fetch-to-API function
async function post(endpoint, data = {}) {
  const response = await fetch(`${process.env.BASE_URL}/api${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Secret: process.env.SECRET,
    },
    body: JSON.stringify(data),
  })
  const res = await response.json()
  return res
}

// Create Window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
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
    .then(ports => {
      mainWindow.webContents.send('ports', ports)
    })
    .catch(err => console.error(err))
}

ipcMain.on('get-ports', sendPorts)

ipcMain.on('use-port', (e, port) => {
  const serial = new SerialPort(port, { baudRate: 115200 })
  const parser = serial.pipe(new Readline())

  parser.on('data', uid => {
    uid = uid.replace('\r', '')

    mainWindow.webContents.send('card-detected', uid)
  })
})

// Listeners
ipcMain.on('get-user', (e, data) => {
  post('/get-user', data).then(user => {
    if (user) e.reply('get-user-res', user)
    else
      e.reply('status', {
        type: 'ERROR',
        message: 'El usuario no se ha encontrado',
      })
  })
})

ipcMain.on('add-viajes', (e, data) => {
  post('/add-viajes', data).then(res => {
    if (!res || res.error)
      e.reply('status', { type: 'ERROR', message: res.error || false })
    else e.reply('add-viajes-res', res.viajes)
  })
})

ipcMain.on('create-user', (e, data) => {
  post('/create-user', data).then(user => {
    e.reply('status', {
      type: !user || user.error ? 'ERROR' : 'USER_CREATED',
      message: user.error || false,
    })
  })
})

ipcMain.on('update-user', (e, data) => {
  post('/update-user', data).then(user => {
    e.reply('status', {
      type: !user || user.error ? 'ERROR' : 'USER_UPDATED',
      message: user.error || false,
    })
  })
})

ipcMain.on('get-prices', (e, data) => {
  post('/get-prices', data).then(metadata => {
    if (metadata) e.reply('get-prices-res', metadata)
    else
      e.reply('status', {
        type: 'ERROR',
        message: 'Error al cargar los precios',
      })
  })
})

ipcMain.on('update-prices', (e, data) => {
  post('/update-prices', data).then(metadata => {
    e.reply('status', {
      type: !metadata || metadata.error ? 'ERROR' : 'PRICES_UPDATED',
      message: metadata.error || false,
    })
  })
})
