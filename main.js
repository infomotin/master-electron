// Modules
const { app, BrowserWindow } = require('electron')
//check if the app is ready out put on console 
const appisRabe = () => { 
  console.log('app is ready'+ app.isReady());
}
// appisRabe();
setTimeout(() => {
  appisRabe();
 }, 1000);
const colors = require('colors');
// using bcript 
const bcrypt = require('bcrypt');
bcrypt.hash('123456', 10, function (err, hash) { 
  console.log(hash); 
  // Store hash in your password DB. 
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
// before app is quit function 
const beforeAppQuit = () => {
  console.log('before app quit' + app.on('before-quit', (event) => {
    console.log('privent app from quiting');
    //this event will not quit the app to save the data from user 
    event.preventDefault();
   }));
}
// beforeAppQuit();
//app unfocus 
const appUnfocus = () => { 
  console.log('app unfocus' + app.on('browser-window-blur', () => {
    console.log('app unfocus');
    setTimeout(() => {
      app.quit();
      console.log('app quit when unfocus');
    }, 1000);
  }));
}
appUnfocus();

//app focus
const appFocus = () => {
  console.log('app focus' + app.on('browser-window-focus', () => {
    console.log('app focus');
  }));
}
appFocus();

// Electron `app` is ready
app.on('ready', () => { 
  console.log(colors.rainbow('app is ready!'));
  console.log('app.getPath("userData")' + app.getPath("userData"));
  console.log('app.getPath("music")' + app.getPath("music"));
  console.log('app.getPath("pictures")' + app.getPath("pictures"));
  console.log('app.getPath("videos")' + app.getPath("videos"));
  console.log('app.getPath("downloads")' + app.getPath("downloads"));
  console.log('app.getPath("documents")' + app.getPath("documents"));
  console.log('app.getPath("desktop")' + app.getPath("desktop"));
  console.log('app.getPath("temp")' + app.getPath("temp"));
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
