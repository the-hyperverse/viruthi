import { ipcMain } from 'electron';
import { TableService } from '../services/tables/table.service';
import * as equityController from './equity.controller';
import { ImportService } from '../services/import.service';
import { cardDTO, ResponseDTO } from '@/models/models';
import { HoldingService } from '../services/holding.service';
import { STATUS } from '../models/constants.core';

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

    ipcMain.handle('import-file', (event, formData: any): Promise<ResponseDTO<void>> => {
        //TODO: validate file name
        return ImportService.getInstance().importFile(formData);
    });

    ipcMain.handle('get-net-worth', async (event): Promise<ResponseDTO<cardDTO>> => {
        const data = await HoldingService.getInstance().getNetWorth();
        return { status: STATUS.OK, message:"", data: data } as ResponseDTO<cardDTO>;
    });

    ipcMain.handle('get-equity-holdings', async (event): Promise<ResponseDTO<any[]>> => {
        const data = await HoldingService.getInstance().getEquities();
        return { status: STATUS.OK, message: "", data: data } as ResponseDTO<any[]>;
    });

    ipcMain.handle('get-mutual-fund-holdings', async (event): Promise<ResponseDTO<any[]>> => {
        const data = await HoldingService.getInstance().getMutualFunds();
        return { status: STATUS.OK, message: "", data: data } as ResponseDTO<any[]>;
    });

    equityController.registerRoutes();
}

