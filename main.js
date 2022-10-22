const { app, BrowserWindow } = require("electron");
let mainWindow, secondWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
    frame: false,
  });
  mainWindow.loadFile("index.html");
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });

  //load url for production
  // mainWindow.loadURL("https://google.com");
  // mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
