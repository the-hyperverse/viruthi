import { ipcMain } from 'electron';
import { TableService } from '../services/tables/table.service';
import * as equityController from './equity.controller';
import { ImportService } from '../services/import.service';
import { ResponseDTO } from '@/models/models';

export function registerRoutes() {

    ipcMain.on('getAssetClasses', (event) => {
        const data = TableService.getInstance().getAssetClasses();
        event.reply('getAssetClassesReply', data);
    });

    ipcMain.on('getGoldTypes', (event) => {
        const data = TableService.getInstance().getGoldTypes();
        event.reply('getGoldTypesReply', data);
    });

    ipcMain.on('getMarkets', (event) => {
        const data = TableService.getInstance().getMarkets();
        event.reply('getMarketsReply', data);
    });

    ipcMain.handle('import-file', (event, formData: any): Promise<ResponseDTO> => {
        //TODO: validate file name
        return ImportService.getInstance().importFile(formData);
    });

    equityController.registerRoutes();
}

