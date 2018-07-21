const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require("electron-updater");
const path = require('path');
const url = require('url');
const Store = require('electron-store');
const si = require('systeminformation');
const isDev = require('electron-is-dev');

let win;
const production = false;

const store = new Store({
  name: 'overseer-ds',
  encryptionKey: "oiV32mVp5lOwYneFESjrWq2xFByNOvNj"
});

function printContents(arg) {

  printWin = new BrowserWindow({
    show: false
  });

  const html = 'data:text/html,' + encodeURIComponent(arg.page);
  printWin.loadURL(html);

  printWin.webContents.on('did-finish-load', () => {
    // Use default printer when printer is not given explicitly
    let printer = arg.printer;
    if (!printer) {
      for (const i of printWin.webContents.getPrinters()) {
        if (i.isDefault) {
          printer = i.name
        }
      }
    }

    printWin.webContents.print({silent: true, deviceName: printer}, () => {
      printWin.close();
    }, () => {
      printWin.close();
    });
  })
}

function loadRenderer() {
  if (isDev) {
    // Development URL
    win.loadURL('http://127.0.0.1:4200');
  } else {
    // Load angular build file
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/overseer-ui/index.html'),
      protocol: 'file',
      slashes: true
    }));
  }
}

function createWindow () {

  // Create new browser window
  win = new BrowserWindow({
    icon: `file://${__dirname}/dist/overseer-ui/assets/logo.png`,
    fullscreen: true
  });

  if (!isDev) {
    win.setMenu(null);
  } else {
    win.setFullScreen(false);
  }

  loadRenderer();

  // Check for updates only on production
  if (production) {
    autoUpdater.checkForUpdates().then(() => {});
  }

  win.on('closed', function () {
    win = null
  })
}

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + Math.round(parseFloat(progressObj.bytesPerSecond) / 1000).toString() + ' kb/s';
  log_message = log_message + ' - Downloaded ' + Math.round(parseFloat(progressObj.percent)).toString() + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  win.webContents.send('download-progress' , log_message);
});

autoUpdater.on('update-downloaded', (info) => {
  win.webContents.send('update-available' , 'Install update');
});

ipcMain.on('systemInformation', (event, arg) => {
  si.getStaticData().then(data => {
    win.webContents.send('systemInformation', data)
  });
});

ipcMain.on('getKey', (event, arg) => {
  event.returnValue = store.get(arg.key) || 0;
});

ipcMain.on('setKey', (event, arg) => {
  store.set(arg.key, arg.value);
  event.returnValue = true;
});

ipcMain.on('removeClientID', (event, arg) => {
  store.delete('clientID');
  event.returnValue = true;
});

ipcMain.on('printContent', (event, arg) => {
  printContents(arg);
});

ipcMain.on('getPrinters', (event, arg) => {
  event.returnValue = win.webContents.getPrinters();
});

ipcMain.on('installUpdate', (event, arg) => {
  autoUpdater.quitAndInstall();
});

ipcMain.on('getAppVersion', (event, arg) => {
  win.webContents.send('message' , app.getVersion());
});

ipcMain.on('checkForUpdate', (event, arg) => {
  autoUpdater.checkForUpdates().then(() => {});
});

ipcMain.on('reloadApp', (event, arg) => {
  loadRenderer();
});

ipcMain.on('restart', () => {
  app.relaunch();
  app.exit(0);
});

ipcMain.on('exit', () => {
  app.quit();
});

// Create window on electron initialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {

  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});
