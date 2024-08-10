import { app, BrowserWindow } from 'electron';

const createWindow = () => {
    const win = new BrowserWindow({ width: 800, height: 800 })
    win.loadFile('index.html')
    win.on('closed', () => {
        win = null;
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
