import { app, BrowserWindow, ipcMain } from 'electron';
import { randomBytes } from 'crypto';

import { PRELOAD_JS_PATH, INDEX_HTML_PATH } from './models/constants';
import { TableService } from './services/tables/table.service';
import * as logService from './services/log/log.service';
import * as controller from './controllers/main.controller';

logService.initializeLogs();
TableService.getInstance().prepareTables();

const createWindow = () => {
    const win = new BrowserWindow({
        show: false,
        height: 500,
        width: 500,
        webPreferences: {
            preload: PRELOAD_JS_PATH,
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.maximize();
    win.show();
    win.loadFile(INDEX_HTML_PATH);

    const nonce = randomBytes(16).toString('base64');
    // // Set up Content Security Policy with the generated nonce
    // win.webContents.on('did-finish-load', () => {
    //     win.webContents.executeJavaScript(`
    //         const meta = document.createElement('meta');
    //         meta.httpEquiv = 'Content-Security-Policy';
    //         meta.content = "default-src 'self'; style-src 'self' 'nonce-${nonce}'; script-src 'self' 'nonce-${nonce}'; img-src 'self'; connect-src 'self'; font-src 'self'; frame-src 'none'; object-src 'none';";
    //         document.head.appendChild(meta);
    //     `);
    // });

    // Send the nonce to the renderer process
    ipcMain.handle('get-nonce', () => nonce);
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        TableService.getInstance().closeDB();
        app.quit();
    }
});

controller.registerRoutes();