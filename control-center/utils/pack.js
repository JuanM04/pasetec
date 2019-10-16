const path = require('path')
const packager = require('electron-packager')
const rebuild = require('electron-rebuild').default

const ARCH = require('yargs').argv.arch || null

async function bundleElectronApp() {
  let icon = ''

  if (process.platform === 'darwin')
    icon = path.resolve(__dirname, 'icons/mac/icon.icns')
  else if (process.platform === 'win32')
    icon = path.resolve(__dirname, 'icons/win/icon.ico')
  else if (process.platform === 'linux')
    icon = path.resolve(__dirname, 'icons/png/1024x1024.png')

  const appPaths = await packager({
    dir: '.',
    overwrite: true,
    prune: true,
    out: path.resolve(__dirname, '../dist'),
    asar: true,
    arch: ARCH || null,
    icon,
    afterCopy: [
      (buildPath, electronVersion, platform, arch, callback) => {
        rebuild({ buildPath, electronVersion, arch })
          .then(callback)
          .catch(callback)
      },
    ],
  })

  console.log(`Electron app bundles created:\n${appPaths.join('\n')}`)
}

bundleElectronApp()
