import { ipcMain } from 'electron';
import { TableService } from '../services/tables/table.service';
import * as equityController from './equity.controller';

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

    equityController.registerRoutes();
}

