import { app, BrowserWindow, ipcMain } from 'electron';
import { randomBytes } from 'crypto';
import sqlite3 from 'sqlite3';

import { FormData } from './models/models';
import { PRELOAD_JS_PATH, INDEX_HTML_PATH } from './models/constants';
import DBService from './services/db.service';
import * as logService from './services/log.service';

logService.initializeLogs()

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

    DBService.createTable("CREATE TABLE IF NOT EXISTS user_data (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)");

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
        DBService.close();
        app.quit();
    }
});

ipcMain.on('form-submission', (event, formData: FormData) => {
    const { name, age } = formData;

    DBService.insertRow("INSERT INTO user_data (name, age) VALUES (?, ?)", [name, age], function (this: sqlite3.RunResult, err: Error | null) {
        if (err) {
            console.error('Failed to insert data:', err.message);
            event.reply('form-submission-reply', { success: false });
        } else {
            event.reply('form-submission-reply', { success: true, id: this.lastID });
        }
    });
});

ipcMain.on('get-data', (event) => {
    DBService.getRows("SELECT * FROM user_data", (err: Error | null, rows?: []) => {
        if (err) {
            console.error('Failed to retrieve data:', err.message);
            event.reply('get-data-reply', []);
        } else {
            event.reply('get-data-reply', rows);
        }
    })
});
