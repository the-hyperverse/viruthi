import { ipcMain } from 'electron';
import { EquityTableService } from '../services/tables/equity.table.service';

export function registerRoutes() {
    ipcMain.on('get-equities', (event, args: { offset: number; limit: number }) => {
        const { offset, limit } = args;
        EquityTableService.getInstance().getAll(offset, limit, 
            rows => {
                if (rows) {
                    //TODO: parse this rows. and Add these APIS to preload
                    event.reply('reply-get-equities', rows);
                }
            }
        );
    });
}

