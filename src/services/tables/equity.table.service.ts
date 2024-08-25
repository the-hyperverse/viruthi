import log from 'electron-log/main';
import { DBService } from "../db/db.service";
import { Equity } from "../../models/models";

export class EquityTableService {
    public static TABLE_NAME: string    = "Equity";
    public static ISIN: string          = "isin";
    public static NAME: string          = "name";
    public static ISIN_NAME: string     = "isinName";
    public static MARET_ID: string      = "marketId";
    public static SYMBOL: string        = "symbol";

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
        return `CREATE TABLE ${EquityTableService.TABLE_NAME} (
                    ${EquityTableService.ISIN} TEXT(20) NOT NULL,
                    ${EquityTableService.NAME} TEXT(200) NOT NULL,
                    ${EquityTableService.ISIN_NAME} TEXT(200),
                    ${EquityTableService.MARET_ID} INTEGER NOT NULL,
                    ${EquityTableService.SYMBOL} TEXT(20),
                    ${EquityTableService.ISIN} Equity_PK PRIMARY KEY (isin)
                );`
    }

    public getAll(offset: number, limit: number, callback: (rows: [] | undefined) => void): void {
        this.dbService.getRows(
            `SELECT * FROM ${EquityTableService.TABLE_NAME} limit ${limit} offset ${offset};`,
            (err, rows) => {
                if (!err) {
                    log.error(err);
                    return;
                }
                callback(rows);
            }
        )
    }

    public get(id: number): Equity | null {
        return null;
    }

    public insert(): void {

    }

    public insertBulk(equities: Equity[]): void {
        this.dbService.insertRows(
            `INERT INTO ${EquityTableService.TABLE_NAME} (
                ${EquityTableService.ISIN},
                ${EquityTableService.NAME},
                ${EquityTableService.ISIN_NAME},
                ${EquityTableService.MARET_ID},
                ${EquityTableService.SYMBOL},
                ${EquityTableService.ISIN}
            ) values (?, ?, ?, ?, ?, ?);`,
            equities
        );
    }

    public delete(id: number): void {

    }
}