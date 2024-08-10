import { app, BrowserWindow, ipcMain } from 'electron';
import sqlite3 from 'sqlite3';
import { join } from 'path';
import { FormData, UserData } from './models'

let db: sqlite3.Database;

try {
    db = new sqlite3.Database(join(__dirname, '../viruthi.db'), (err: Error | null) => {
        if (err) {
            console.error('Failed to open database:', err.message);
        } else {
            console.log('Connected to the database.');
        }
    });

    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS user_data (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)", (err: Error | null) => {
            if (err) {
                console.error('Failed to create table:', err.message);
            }
        });
    });
} catch (error) {
    console.error('Database initialization error:', (error as Error).message);
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
//            enableRemoteModule: false
        }
    });
    win.loadFile(join(__dirname, '../index.html'));
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (db) {
            db.close((err: Error | null) => {
                if (err) {
                    console.error('Failed to close database:', err.message);
                } else {
                    console.log('Database closed.');
                }
            });
        }
        app.quit();
    }
});

ipcMain.on('form-submission', (event, formData: FormData) => {
    const { name, age } = formData;
    console.log('sending form 3');
    db.run("INSERT INTO user_data (name, age) VALUES (?, ?)", [name, age], function (err: Error | null) {
        if (err) {
            console.error('Failed to insert data:', err.message);
            event.reply('form-submission-reply', { success: false });
        } else {
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            event.reply('form-submission-reply', { success: true, id: this.lastID });
        }
    });
});

ipcMain.on('get-data', (event) => {
    //Array<{ id: number; name: string; age: number }
    db.all("SELECT * FROM user_data", [], (err: Error | null, rows: UserData[]) => {
        if (err) {
            console.error('Failed to retrieve data:', err.message);
            event.reply('get-data-reply', []);
        } else {
            event.reply('get-data-reply', rows);
        }
    });
});
