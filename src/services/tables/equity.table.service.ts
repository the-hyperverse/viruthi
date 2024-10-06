import log from 'electron-log/main';
import { DBService } from "../db/db.service";
import { Equity } from "../../models/models";

export class EquityTableService {
    public static readonly TABLE_NAME: string    = "Equity";
    public static readonly ISIN: string          = "isin";
    public static readonly NAME: string          = "name";
    public static readonly ISIN_NAME: string     = "isinName";
    public static readonly MARKET_ID: string     = "marketId";
    public static readonly SYMBOL: string        = "symbol";

    private static instance: EquityTableService;
    private dbService: DBService;

    private constructor() {
        this.dbService = DBService.getInstance();
    }

    public static getInstance() {
        if(!EquityTableService.instance) {
            EquityTableService.instance = new EquityTableService();
        }
        
        return EquityTableService.instance;
    }

    public getCreateQuery(): string {
        return `CREATE TABLE IF NOT EXISTS ${EquityTableService.TABLE_NAME} (
                    ${EquityTableService.ISIN} VARCHAR(20) NOT NULL,
                    ${EquityTableService.NAME} VARCHAR(200) NOT NULL,
                    ${EquityTableService.ISIN_NAME} VARCHAR(200),
                    ${EquityTableService.MARKET_ID} INTEGER NOT NULL,
                    ${EquityTableService.SYMBOL} VARCHAR(20),
                    PRIMARY KEY (${EquityTableService.ISIN})
                );`
    }

    public getAll(offset: number, limit: number, callback: (rows: [] | undefined) => void): void {
        this.dbService.getRows(
            'SELECT * FROM ${EquityTableService.TABLE_NAME} limit ? offset ?;',
            [limit, offset],
            (err, rows) => {
                if (!err) {
                    log.error(err);
                    return;
                }
                callback(rows);
            }
        )
    }

    public get(isin: string | undefined, marketId: number | undefined, callback: (rows: Equity[] | undefined) => void): void {
        let sql = `SELECT * FROM ${EquityTableService.TABLE_NAME} WHERE`;
        let addedFilter = false;
        let params: any[] = [];
        if (isin) {
            sql + ` ${EquityTableService.ISIN} = ?`;
            addedFilter = true;
            params.push(isin);
        }
        if (marketId) {
            sql + ` ${addedFilter ? 'AND' : '' } ${EquityTableService.MARKET_ID} = ?`;
            params.push(marketId);
        }

        this.dbService.getRows(
            sql + ';',
            params,
            (err, rows) => {
                if (!err) {
                    log.error(err);
                    return;
                }
                callback(rows);
            }
        )
    }

    public search(name: string, callback: (rows: Equity[] | undefined) => void): void {

    }

    public insert(equity: Equity, callback: (err: Error | null) => void): void {
        this.dbService.insertRow(
            `INERT INTO ${EquityTableService.TABLE_NAME} (
                ${EquityTableService.ISIN},
                ${EquityTableService.NAME},
                ${EquityTableService.ISIN_NAME},
                ${EquityTableService.MARKET_ID},
                ${EquityTableService.SYMBOL},
                ${EquityTableService.ISIN}
            ) values (?, ?, ?, ?, ?, ?);`,
            Object.values(equity),
            callback
        );
    }

    public insertBulk(equities: Equity[]): void {
        this.dbService.insertRows(
            `INERT INTO ${EquityTableService.TABLE_NAME} (
                ${EquityTableService.ISIN},
                ${EquityTableService.NAME},
                ${EquityTableService.ISIN_NAME},
                ${EquityTableService.MARKET_ID},
                ${EquityTableService.SYMBOL},
                ${EquityTableService.ISIN}
            ) values (?, ?, ?, ?, ?, ?);`,
            equities
        );
    }

    public delete(id: number): void {

    }
}