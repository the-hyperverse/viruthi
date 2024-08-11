import { ipcMain } from 'electron';
import { TableService } from '../services/tables/table.service';

export function registerRoutes() {
    ipcMain.on('get-equities', (event) => {
        const data = TableService.getInstance().getAssetClasses()
        event.reply('reply-get-equities', data);
    });
}

