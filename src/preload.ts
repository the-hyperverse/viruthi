import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { FormSubmissionReplyCallback, DataRetrievedCallback, FormData } from './models/models'


contextBridge.exposeInMainWorld('electronAPI', {
    sendForm: (formData: FormData) => {
        try {
            ipcRenderer.send('form-submission', formData);
        } catch (err) {
            console.error('1', err);
        }
    },
    onFormSubmissionReply: (callback: FormSubmissionReplyCallback) => {
        ipcRenderer.on('form-submission-reply', (event, ...args) => {
            try {
                callback(event, args[0]);
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
    onDataRetrieved: (callback: DataRetrievedCallback) => {
        ipcRenderer.on('get-data-reply', (event, ...args) => {
            try {
                callback(event, args[0]);
            } catch (err) {
                console.error('4', err);
            }
        });
    },
    //TODO: this should be removed
    getNonce: async () => {
        return ipcRenderer.invoke('get-nonce');
    }
});

// Example cleanup function
const cleanup = () => {
    ipcRenderer.removeAllListeners('form-submission-reply');
    ipcRenderer.removeAllListeners('get-data-reply');
};

// Call cleanup when appropriate (e.g., before renderer process is unloaded)
window.addEventListener('beforeunload', cleanup);
