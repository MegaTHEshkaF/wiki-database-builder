const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
require('@electron/remote/main').initialize();

const path = require('path');

const isDev = require('electron-is-dev');
const isMac = process.platform === 'darwin';

const { installExtension, REACT_DEVELOPER_TOOLS } = require('electron-extension-installer');

let mainWindow;
function CreateMainWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
            minWidth: 1280,
            minHeight: 720,
            icon: path.join(__dirname, '/favicon.ico'),
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                contextIsolation: false,
            },
    });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000');

    // Implement menu
    mainWindow.setMenu(Menu.buildFromTemplate(mainMenu));

    // Fullscreen
    mainWindow.maximize();

    // Open the DevTools.
    if(isDev) mainWindow.webContents.openDevTools();
};

const mainMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New',
                click: () => mainWindow.webContents.send('menu:create'),
                accelerator: 'CmdOrCtrl+N',
            },
            {
                label: 'Open',
                click: () => mainWindow.webContents.send('menu:open'),
                accelerator: 'CmdOrCtrl+O',
            },
            { type: 'separator' },
            {
                label: 'Save',
                click: () => mainWindow.webContents.send('menu:save'),
                accelerator: 'CmdOrCtrl+S',
                enabled: false,
            },
        ],
    },
    ...(isDev ? [
        {
            label: 'Developer',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { type: 'separator' },
                { role: 'toggledevtools' },
            ],
        },
    ] : []),
];

// App is ready
app.on('ready', () => {
    Menu.setApplicationMenu(null);

    CreateMainWindow();
    
    // Remove variable from memory
    mainWindow.on('closed', () => (mainWindow = null));
});
app.on("ready", async () => {
    await installExtension(REACT_DEVELOPER_TOOLS, {
        loadExtensionOptions: {
            allowFileAccess: true,
        },
    });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});

// Open a window if none are open (macOS)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) CreateMainWindow();
});

// Listen for renderer events
ipcMain.on('command:loadAssets', (event, importDir, exportDir) => {
    // console.log(importDir); console.log(exportDir);
    mainWindow.webContents.send('command:loadAssets', importDir, exportDir);
});

// Handle render dialog
ipcMain.handle('dialog', (event, method, params) => dialog[method](params));