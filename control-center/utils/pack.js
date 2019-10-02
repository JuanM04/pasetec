const path = require('path')
const packager = require('electron-packager')

async function bundleElectronApp(icon) {
  const appPaths = await packager({
    dir: '.',
    overwrite: true,
    prune: true,
    out: path.resolve(__dirname, '../dist'),
    asar: true,
    arch: process.env.ELECTRON_ARCH || null,
    icon,
  })

  console.log(`Electron app bundles created:\n${appPaths.join('\n')}`)
}

let icon = ''

if (process.platform === 'darwin')
  icon = path.resolve(__dirname, 'icons/mac/icon.icns')
else if (process.platform === 'win32')
  icon = path.resolve(__dirname, 'icons/win/icon.ico')
else if (process.platform === 'linux')
  icon = path.resolve(__dirname, 'icons/png/1024x1024.png')

bundleElectronApp(icon)
