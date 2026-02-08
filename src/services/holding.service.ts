import log from 'electron-log/main';
import { DBService } from "./db/db.service";
import { HoldingTableService as HTS } from "./tables/holding.table.service";
import { EquityTableService as ETS } from "./tables/equity.table.service";
import { MutualFundTableService as MFTS } from "./tables/mf.table.service";
import staticData from "../data/staticData.json";
import { cardDTO } from '@/models/models';
import { EquityHoldingViewModel, MutualFundHoldingViewModel } from '@/components/viewmodels/viewmodels';

export class HoldingService {
    private static instance: HoldingService;
    private dbService: DBService;

    private constructor() {
        this.dbService = DBService.getInstance();
    }

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

    public getEquities(): Promise<EquityHoldingViewModel[]> {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    h.${HTS.MARKET_ID},
                    h.${HTS.ASSET_ID} as isin,
                    h.${HTS.RATE},
                    h.${HTS.QUANTITY},
                    e.${ETS.NAME},
                    e.${ETS.ISIN_NAME},
                    e.${ETS.SYMBOL},
                    (h.${HTS.RATE} * h.${HTS.QUANTITY}) as amount
                FROM (
                    SELECT
                        *,
                        ROW_NUMBER() OVER (PARTITION BY ${HTS.ASSET_ID} ORDER BY ${HTS.HOLDING_DATE} DESC) as rn
                    FROM ${HTS.TABLE_NAME}
                    WHERE ${HTS.ASSET_CLASS_ID} = 1
                ) h
                JOIN ${ETS.TABLE_NAME} e ON h.${HTS.ASSET_ID} = e.${ETS.ISIN}
                WHERE h.rn = 1
            `;

            this.dbService.getRows(sql, [], (err, rows) => {
                if (err) {
                    log.error(err);
                    reject(err);
                    return;
                }

                const result: EquityHoldingViewModel[] = (rows || []).map((row: any) => ({
                    isin: row.isin,
                    name: row.name,
                    isinName: row.isinName,
                    marketId: row.marketId,
                    symbol: row.symbol,
                    holding: row.quantity,
                    rate: row.rate,
                    amount: row.amount,
                    holdingDiff: 0, // Not implemented
                    rateDiff: 0, // Not implemented
                    amountDiff: 0, // Not implemented
                    investedAmount: row.amount // Assuming cost = current value for now as we lack cost basis
                }));

                resolve(result);
            });
        });
    }

    public getMutualFunds(): Promise<MutualFundHoldingViewModel[]> {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    h.${HTS.MARKET_ID},
                    h.${HTS.ASSET_ID} as folioNumber,
                    h.${HTS.RATE},
                    h.${HTS.QUANTITY},
                    mf.${MFTS.NAME},
                    (h.${HTS.RATE} * h.${HTS.QUANTITY}) as amount
                FROM (
                    SELECT
                        *,
                        ROW_NUMBER() OVER (PARTITION BY ${HTS.ASSET_ID} ORDER BY ${HTS.HOLDING_DATE} DESC) as rn
                    FROM ${HTS.TABLE_NAME}
                    WHERE ${HTS.ASSET_CLASS_ID} = 2
                ) h
                JOIN ${MFTS.TABLE_NAME} mf ON h.${HTS.ASSET_ID} = mf.${MFTS.FOLIO_NUMBER}
                WHERE h.rn = 1
            `;

            this.dbService.getRows(sql, [], (err, rows) => {
                if (err) {
                    log.error(err);
                    reject(err);
                    return;
                }

                const result: MutualFundHoldingViewModel[] = (rows || []).map((row: any) => ({
                    folioNumber: row.folioNumber,
                    name: row.name,
                    marketId: row.marketId,
                    holding: row.quantity,
                    rate: row.rate,
                    amount: row.amount,
                    holdingDiff: 0,
                    rateDiff: 0,
                    amountDiff: 0,
                    investedAmount: row.amount
                }));

                resolve(result);
            });
        });
    }
}
