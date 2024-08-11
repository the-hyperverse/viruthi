import 'electron';
import { AssetClass } from '../models/models'

declare global {
    interface Window {
        electronAPI: {
            getEquities: () => void;
            replyGetEquities: (callback: (event: Electron.IpcRendererEvent, rows: AssetClass[]) => void) => void;
            getNonce: () => void;
        };
    }
}