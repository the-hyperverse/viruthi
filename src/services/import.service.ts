import staticData from "../data/staticData.json";
import fs from "fs";
import csv from "csv-parser";
import { Equity, Holding, ResponseDTO } from "@/models/models";
import log from 'electron-log/main';
import { EquityTableService } from "./tables/equity.table.service";
import { HoldingTableService } from "./tables/holding.table.service";
import { STATUS } from "../models/constants.core";
import { Readable } from "stream";

export class ImportService {
    private static instance: ImportService;

    private constructor() { }

    public static getInstance() {
        if (!ImportService.instance) {
            ImportService.instance = new ImportService();
        }
        return ImportService.instance;
    }

    public async importFile(formData: any): Promise<ResponseDTO<void>> {
        const filePath = formData.filePath as string;
        const importType = parseInt(formData.importType as string);
        let result: Promise<ResponseDTO<void>>;

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
                result = Promise.resolve({ status: STATUS.INTERNAL_SERVER_ERROR, message: "Invalid import type" } as ResponseDTO<void>);
                break;
        }

        return result;
    }

    private async importIndianStocks(filePath: string): Promise<ResponseDTO<void>> {
        return new Promise((resolve, reject) => {
            let stocks: Equity[] = [];
            const res = { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error inserting stocks" } as ResponseDTO<void>;

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
                        if (stocks.length > 0) {
                            const result = await EquityTableService.getInstance().insertBulk(stocks);
                            if (result) {
                                res.status = STATUS.OK;
                                res.message = "CSV file successfully processed";
                            }
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

    private async importCdslHoldings(filePath: string): Promise<ResponseDTO<void>> {
        return new Promise((resolve, reject) => {
            const holdings: Holding[] = [];
            const res = { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error importing CDSL holdings" } as ResponseDTO<void>;
            let holdingDate: Date | null = null;

            const fileContent = fs.readFileSync(filePath, 'utf8');
            const statementDateMatch = fileContent.match(/Statement as on : (\d{2}-[A-Za-z]{3}-\d{4})/);
            if (!statementDateMatch) {
                res.message = 'Could not find the "Statement as on" date.';
                log.error(res.message);
                resolve(res);
                return;
            }

            holdingDate = new Date(statementDateMatch[1]);
            log.debug('Holding Date:', holdingDate);

            // Prune the CSV content to start from the table headers
            const tableStartIndex = fileContent.indexOf('Sr.No.,ISIN,ISIN Name,ISIN Listing,Paid Up Value,Balance ,Last Closing Price ,Value');
            if (tableStartIndex === -1) {
                res.message = 'Could not find the table headers in the file.';
                log.error(res.message);
                resolve(res);
                return;
            }

            const prunedContent = fileContent.substring(tableStartIndex);
            const csvStream = Readable.from(prunedContent);

            // Process the pruned CSV data
            csvStream
                .pipe(csv())
                .on('data', (row: Record<string, string>) => {
                    //log.debug('Row:', row);
                    const holding: Holding = {
                        id: 0,
                        marketId: staticData.marketKeys.IN,
                        assetClassId: 1, // Equity
                        assetId: row['ISIN'].trim(),
                        rate: parseFloat(row['Last Closing Price ']?.replace(/,/g, '') ?? 0),
                        quantity: parseFloat(row['Balance ']?.replace(/,/g, '') ?? 0),
                        holdingDate: holdingDate ?? new Date(),
                        createdBy: 0, // System
                        createdOn: new Date()
                    };
                    holdings.push(holding);

                })
                .on('end', async () => {
                    try {
                        if (holdings.length > 0) {
                            //log.debug('Holdings:', holdings);
                            const result = await HoldingTableService.getInstance().insertBulk(holdings);
                            if (result) {
                                res.status = STATUS.OK;
                                res.message = "CDSL holdings successfully imported";
                            }
                        }

                        log.info(res.message);
                        resolve(res);

                    } catch (err: any) {
                        log.error('Error processing CDSL holdings:', err);
                        res.message = err?.message ?? "Error processing CDSL holdings";
                        resolve(res);
                    }
                })
                .on('error', (err: any) => {
                    log.error('Error reading CDSL holdings CSV:', err);
                    res.message = err?.message ?? "Error reading CDSL holdings CSV";
                    resolve(res);
                });
        });
    }

    private async importNdslHoldings(filePath: string): Promise<ResponseDTO<void>> {
        return { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error in handling NDSL holdings" } as ResponseDTO<void>;
    }

    private async importMutualFunds(filePath: string): Promise<ResponseDTO<void>> {
        return { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error in handling Mutual Funds" } as ResponseDTO<void>;
    }

    private async importUsVestedHoldingsExport(filePath: string): Promise<ResponseDTO<void>> {
        return { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error in handling US Vested Holdings Export" } as ResponseDTO<void>;
    }
    private async importGoldHoldings(filePath: string): Promise<ResponseDTO<void>> {
        return { status: STATUS.INTERNAL_SERVER_ERROR, message: "Error in handling Gold Holdings" } as ResponseDTO<void>;
    }
}
