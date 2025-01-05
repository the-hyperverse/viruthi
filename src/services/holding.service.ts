import log from 'electron-log/main';
import { DBService } from "./db/db.service";
import { HoldingTableService as HTS } from "./tables/holding.table.service";
import staticData from "../data/staticData.json";
import { cardDTO } from '@/models/models';

export class HoldingService {
    private static instance: HoldingService;

    private constructor() { }

    public static getInstance() {
        if (!HoldingService.instance) {
            HoldingService.instance = new HoldingService();
        }
        return HoldingService.instance;
    }

    public getUSDtoINR(): number {
        return 85;
    }

    public async getNetWorth(): Promise<cardDTO> {

        const netWorthSql = 
            `SELECT ${HTS.MARKET_ID}, SUM(${HTS.RATE} * ${HTS.QUANTITY}) AS amount
                FROM (
                    SELECT 
                        h.${HTS.MARKET_ID}, 
                        h.${HTS.ASSET_CLASS_ID}, 
                        h.${HTS.HOLDING_DATE}, 
                        h.${HTS.RATE}, 
                        h.${HTS.QUANTITY},
                        MAX(h.${HTS.HOLDING_DATE}) OVER (PARTITION BY h.${HTS.MARKET_ID}, h.${HTS.ASSET_CLASS_ID}) AS lastHoldingDate
                    FROM 
                        ${HTS.TABLE_NAME} h
                ) subquery
                WHERE 
                    ${HTS.HOLDING_DATE} = lastHoldingDate
                GROUP BY 
                    ${HTS.MARKET_ID};`;

        const amount = new Promise((resolve, reject) => {
            DBService.getInstance().getRows(netWorthSql, [], (err, rows) => {
                if (err) {
                    log.error(err?.message);
                    reject(err);
                    return;
                }

                if (!rows || rows.length === 0) {
                    resolve(0);
                    return;
                }

                let totalAmountInUSD = 0;
                rows.forEach((row: any) => {
                    switch (row.marketId) {
                        case staticData.marketKeys.IN:
                            totalAmountInUSD += row.amount / this.getUSDtoINR();
                            break;
                        case staticData.marketKeys.US:
                            totalAmountInUSD += row.amount
                            break;
                    }
                });

                resolve(totalAmountInUSD);
            });
        });

        const diff = new Promise((resolve, reject) => { resolve(12) });

        return new Promise((resolve, reject) => {
            Promise.all([amount, diff]).then((values) => {
                resolve( { amount: values[0] as number, diff: values[1] as number });
            }).catch((err) => {
                log.error(err);
                reject(err);
            });
        });
    }
}