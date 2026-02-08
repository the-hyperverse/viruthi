import 'electron';
import { AssetClass } from '../models/models'

declare global {
    interface Window {
        electronAPI: {
            getEquities: () => void;
            replyGetEquities: (callback: (event: Electron.IpcRendererEvent, rows: AssetClass[]) => void) => void;
            getNonce: () => void;
            importFile: (formData: any) => Promise<ResponseDTO<void>>;
            getFilePath: (file: File) => string;
            getNetWorth: () => Promise<ResponseDTO<cardDTO>>;
            getEquityHoldings: () => Promise<ResponseDTO<any[]>>;
            getMutualFundHoldings: () => Promise<ResponseDTO<any[]>>;
        };
    }
}