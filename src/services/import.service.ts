import staticData from "../data/staticData.json";
import fs from "fs";
import csv from "csv-parser";
import { Equity, ResponseDTO } from "@/models/models";
import log from 'electron-log/main';
import { EquityTableService } from "./tables/equity.table.service";
import { STATUS } from "../models/constants.core";

export class ImportService {
    private static instance: ImportService;

    private constructor() { }

    public static getInstance() {
        if (!ImportService.instance) {
            ImportService.instance = new ImportService();
        }
        return ImportService.instance;
    }

    public async importFile(formData: any): Promise<ResponseDTO> {
        const filePath = formData.filePath as string;
        const importType = parseInt(formData.importType as string);
        let result: Promise<ResponseDTO>;

        switch (importType) {
            case staticData.importTypeKeys.IN_STOCKS:
                result = this.importIndianStocks(filePath);
                break;
            case staticData.importTypeKeys.IN_CDSL_HOLDINGS:
                result = this.importCdslHoldings(filePath);
                break;
            case staticData.importTypeKeys.IN_NSDL_HOLDINGS:
                result = this.importNdslHoldings(filePath);
                break;
            case staticData.importTypeKeys.IN_MUTUAL_FUNDS:
                result = this.importMutualFunds(filePath);
                break;
            case staticData.importTypeKeys.US_VESTED_HOLDINGS_EXPORT:
                result = this.importUsVestedHoldingsExport(filePath);
                break;
            case staticData.importTypeKeys.GOLD_HOLDINGS:
                result = this.importGoldHoldings(filePath);
                break;
            default:
                result = Promise.resolve({ status: STATUS.INTERNAL_SERVER_ERROR, message: "Invalid import type" });
                break;
        }

        return result;
    }

    private async importIndianStocks(filePath: string): Promise<ResponseDTO> {
        return new Promise((resolve, reject) => {
            let stocks: Equity[] = [];
            const res: ResponseDTO = { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error inserting stocks" };

            //TODO: preprocess CSV file to remove unwanted columns and trim values
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row: Record<string, string>) => {
                    //log.debug('Row:', row);
                    stocks.push({
                        isin: row[' ISIN NUMBER'],
                        name: row['NAME OF COMPANY'],
                        isinName: row['NAME OF COMPANY'],
                        marketId: staticData.marketKeys.IN,
                        symbol: row['SYMBOL'],
                    });
                })
                .on('end', async () => {
                    try {
                        //log.debug('Stocks:', stocks);
                        const result = await EquityTableService.getInstance().insertBulk(stocks);
                        if (result) {
                            res.status = STATUS.OK;
                            res.message = "CSV file successfully processed";
                        }

                        resolve(res);
                        log.info(res.message);

                    } catch (err: any) {
                        log.error('Error reading CSV file:', err);
                        res.message = err?.message ?? "Error reading CSV file";
                        resolve(res);
                    }
                })
                .on('error', (err: any) => {
                    log.error('Error reading CSV file:', err);
                    res.message = err?.message ?? "Error reading CSV file";
                    resolve(res);
                });
        });
    }

    private async importCdslHoldings(filePath: string): Promise<ResponseDTO> {
        return { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error in handling CDSL holdings" };
    }

    private async importNdslHoldings(filePath: string):  Promise<ResponseDTO> {
        return { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error in handling NDSL holdings" };
    }

    private async importMutualFunds(filePath: string):  Promise<ResponseDTO> {
        return { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error in handling Mutual Funds" };
    }

    private async importUsVestedHoldingsExport(filePath: string):  Promise<ResponseDTO> {
        return { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error in handling US Vested Holdings Export" };
    }
    private async importGoldHoldings(filePath: string):  Promise<ResponseDTO> {
        return { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error in handling Gold Holdings" };
    }
}
