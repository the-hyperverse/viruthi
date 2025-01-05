import { contextBridge, ipcRenderer, IpcRendererEvent, webUtils } from 'electron';
import { AssetClass, ResponseDTO } from './models/models';
import { STATUS } from './models/constants.core';
//import log from 'electron-log';
//TODO: electron log is not working in preload

contextBridge.exposeInMainWorld('electronAPI', {
    getEquities: (): void => {
        try {
            ipcRenderer.send('get-equities');
        } catch (err) {
            //log.error('3', err);
            console.error("Error ", err)
        }
    },
    replyGetEquities: (callback: (event: IpcRendererEvent, equities: AssetClass[]) => void) => {
        ipcRenderer.on('reply-get-equities', (event, equities: AssetClass[]) => {
            try {
                callback(event, equities);
            } catch (err) {
                //log.error('4', err);
                console.error("Error ", err)
            }
        });
    },

    importFile: async (formData: any): Promise<ResponseDTO> => { 
        try {
            return ipcRenderer.invoke('import-file', formData);
        } catch (err) {
            console.error("Error ", err)
            return { status: STATUS.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' } as ResponseDTO;
        }
    },
    getFilePath: (file: File): string => { 
        return webUtils.getPathForFile(file);
    },

    //TODO: this should be removed
    getNonce: async () => {
        return ipcRenderer.invoke('get-nonce');
    }
});


// Example cleanup function
const cleanup = () => {
    ipcRenderer.removeAllListeners('get-equities');
    ipcRenderer.removeAllListeners('reply-get-equities');
    ipcRenderer.removeAllListeners('get-nonce');
};

// Call cleanup when appropriate (e.g., before renderer process is unloaded)
window.addEventListener('beforeunload', cleanup);
