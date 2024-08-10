import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    sendForm: (formData) => {
        try {
            ipcRenderer.send('form-submission', formData);
            console.log('sending form 2');
        } catch (err) {
            console.error('1', err);
        }
    },
    onFormSubmissionReply: (callback) => {
        ipcRenderer.on('form-submission-reply', (event, ...args) => {
            try {
                callback(event, ...args);
            } catch (err) {
                console.error('2', err);
            }
        });
    },
    requestData: () => {
        try {
            ipcRenderer.send('get-data');
        } catch (err) {
            console.error('3', err);
        }
    },
    onDataRetrieved: (callback) => {
        ipcRenderer.on('get-data-reply', (event, ...args) => {
            try {
                callback(event, ...args);
            } catch (err) {
                console.error('4', err);
            }
        });
    }
});

// Example cleanup function
const cleanup = () => {
    ipcRenderer.removeAllListeners('form-submission-reply');
    ipcRenderer.removeAllListeners('get-data-reply');
};

// Call cleanup when appropriate (e.g., before renderer process is unloaded)
window.addEventListener('beforeunload', cleanup);

console.log('loaded');