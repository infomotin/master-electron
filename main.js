// Modules
const { app, BrowserWindow } = require('electron')
const colors = require('colors');
// using bcript 
const bcrypt = require('bcrypt');
bcrypt.hash('123456', 10, function (err, hash) { 
  console.log(hash); 
  // Store hash in your password DB. 
});
//check if the app is ready out put on console 
app.on('ready', () => {
  console.log('App is ready'.green, app.isReady());
  //create new window
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
console.log(colors.rainbow('Hello from Electron!'));
// Create a new BrowserWindow when `app` is ready
function createWindow () {
  // console.log(process);

  mainWindow = new BrowserWindow({
    width: 800, height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    // debugger;
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', () => { 
  console.log(colors.rainbow('app is ready!'));
  createWindow();
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
