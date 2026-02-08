import log from 'electron-log/main';
import { DBService } from "../db/db.service";
import { MutualFund } from "../../models/models";

export class MutualFundTableService {
    public static readonly TABLE_NAME: string    = "MutualFund";
    public static readonly FOLIO_NUMBER: string  = "folioNumber";
    public static readonly NAME: string          = "name";
    public static readonly MARKET_ID: string     = "marketId";

    private static instance: MutualFundTableService;
    private dbService: DBService;

    private constructor() {
        this.dbService = DBService.getInstance();
    }

    public static getInstance() {
        if(!MutualFundTableService.instance) {
            MutualFundTableService.instance = new MutualFundTableService();
        }
        
        return MutualFundTableService.instance;
    }

    public getCreateQuery(): string {
        return `CREATE TABLE IF NOT EXISTS ${MutualFundTableService.TABLE_NAME} (
                    ${MutualFundTableService.FOLIO_NUMBER} VARCHAR(50) NOT NULL,
                    ${MutualFundTableService.NAME} VARCHAR(200) NOT NULL,
                    ${MutualFundTableService.MARKET_ID} INTEGER NOT NULL,
                    PRIMARY KEY (${MutualFundTableService.FOLIO_NUMBER})
                );`
    }

    public getAll(offset: number, limit: number, callback: (rows: MutualFund[] | undefined) => void): void {
        this.dbService.getRows(
            `SELECT * FROM ${MutualFundTableService.TABLE_NAME} limit ? offset ?;`,
            [limit, offset],
            (err, rows) => {
                if (err) {
                    log.error(err);
                    return;
                }
                callback(rows as MutualFund[]);
            }
        )
    }

    public get(folioNumber: string | undefined, marketId: number | undefined, callback: (rows: MutualFund[] | undefined) => void): void {
        let sql = `SELECT * FROM ${MutualFundTableService.TABLE_NAME}`;
        let addedFilter = false;
        let params: any[] = [];
        let whereClause = "";

        if (folioNumber) {
            whereClause += ` ${MutualFundTableService.FOLIO_NUMBER} = ?`;
            params.push(folioNumber);
            addedFilter = true;
        }

        if (marketId) {
            whereClause += ` ${addedFilter ? 'AND' : ''} ${MutualFundTableService.MARKET_ID} = ?`;
            params.push(marketId);
            addedFilter = true;
        }

        if (addedFilter) {
            sql += ` WHERE ${whereClause}`;
        }

        this.dbService.getRows(
            sql + ';',
            params,
            (err, rows) => {
                if (err) {
                    log.error(err);
                    return;
                }
                callback(rows as MutualFund[]);
            }
        )
    }

    public insert(mutualFund: MutualFund, callback: (err: Error | null) => void): void {
        this.dbService.insertRow(
            `INSERT INTO ${MutualFundTableService.TABLE_NAME} (
                ${MutualFundTableService.FOLIO_NUMBER},
                ${MutualFundTableService.NAME},
                ${MutualFundTableService.MARKET_ID}
            ) values (?, ?, ?);`,
            Object.values(mutualFund),
            callback
        );
    }

    public async insertBulk(mutualFunds: MutualFund[]): Promise<boolean> {
        let iQs: string[] = [];

        for (let i = 0; i < mutualFunds.length; i += 200) {

            let iQ = `INSERT INTO ${MutualFundTableService.TABLE_NAME} (
                ${MutualFundTableService.FOLIO_NUMBER},
                ${MutualFundTableService.NAME},
                ${MutualFundTableService.MARKET_ID}
            ) values `;

            const batch = mutualFunds.slice(i, i + 200);
            for (let j = 0; j < batch.length; j++) {
                const mf = batch[j];
                this.sanitise(mf);
                iQ += `('${mf.folioNumber}','${mf.name}',${mf.marketId})${j === batch.length - 1 ? ';' : ','}`;
            }

            iQs.push(iQ);
        }

        return this.dbService.insertRows(iQs);
    }

    public delete(id: number): void {

    }

    private sanitise(mf: MutualFund) {
        if (mf.folioNumber) mf.folioNumber = mf.folioNumber.replace(/['"\\]/g, '');
        if (mf.name) mf.name = mf.name.replace(/['"\\]/g, '');
    }
}
