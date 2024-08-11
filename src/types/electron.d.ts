import 'electron';
import { FormData, FormSubmissionReply, UserData } from '../models/models'

declare global {
    interface Window {
        electronAPI: {
            sendForm: (formData: FormData) => void;
            onFormSubmissionReply: (callback: (event: Electron.IpcRendererEvent, response: FormSubmissionReply) => void) => void;
            requestData: () => void;
            onDataRetrieved: (callback: (event: Electron.IpcRendererEvent, rows: UserData[]) => void) => void;
            getNonce: () => void;
        };
    }
}