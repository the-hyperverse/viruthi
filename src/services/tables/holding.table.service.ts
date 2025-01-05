import log from 'electron-log/main';
import { DBService } from "../db/db.service";
import { Holding } from "../../models/models";

export class HoldingTableService {
    public static readonly TABLE_NAME: string       = "Holding";
    public static readonly ID: string               = "id"; //number
    public static readonly MARKET_ID: string        = "marketId"; //number
    public static readonly ASSET_CLASS_ID: string   = "assetClassId"; //number
    public static readonly ASSET_ID: string         = "assetId"; //string
    public static readonly RATE: string             = "rate"; //number
    public static readonly QUANTITY: string         = "quantity"; //number
    public static readonly HOLDING_DATE: string     = "holdingDate"; //Date
    public static readonly CREATEDBY: string        = "createdBy"; //number
    public static readonly CREATEDON: string        = "createdOn"; //Date

    private static instance: HoldingTableService;
    private dbService: DBService;

    private constructor() {
        this.dbService = DBService.getInstance();
    }

    public static getInstance() {
        if (!HoldingTableService.instance) {
            HoldingTableService.instance = new HoldingTableService();
        }

        return HoldingTableService.instance;
    }

    public getCreateQuery(): string {
        return `CREATE TABLE IF NOT EXISTS ${HoldingTableService.TABLE_NAME} (
            ${HoldingTableService.ID} INTEGER PRIMARY KEY AUTOINCREMENT, 
            ${HoldingTableService.MARKET_ID} INTEGER NOT NULL,
            ${HoldingTableService.ASSET_CLASS_ID} INTEGER NOT NULL,
            ${HoldingTableService.ASSET_ID} VARCHAR(2) NOT NULL,
            ${HoldingTableService.RATE} DECIMAL(10, 2) NOT NULL,
            ${HoldingTableService.QUANTITY} DECIMAL(10, 10) NOT NULL,
            ${HoldingTableService.HOLDING_DATE} DATETIME NOT NULL,
            ${HoldingTableService.CREATEDBY} INTEGER NOT NULL,
            ${HoldingTableService.CREATEDON} DATETIME NOT NULL
        );`;
    }

    public getAll(offset: number, limit: number, callback: (rows: [] | undefined) => void): void {
        this.dbService.getRows(
            `SELECT * FROM ${HoldingTableService.TABLE_NAME} limit ? offset ?;`,
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

    public getById(id: number, callback: (rows: [] | undefined) => void): void {
        this.dbService.getRows(
            `SELECT * FROM ${HoldingTableService.TABLE_NAME} WHERE ${HoldingTableService.ID} = ? ;`,
            [id],
            (err, rows) => {
                if (!err) {
                    log.error(err);
                    return;
                }
                callback(rows);
            }
        )
    }

    public get(
        marketId: number | undefined,
        assetClassId: number | undefined,
        assetId: number | undefined,
        holdingDate: Date | undefined,
        callback: (rows: any[] | undefined) => void
    ): void {

        let sql = `SELECT * FROM ${HoldingTableService.TABLE_NAME} WHERE`;
        let addedFilter = false;
        let params: any[] = [];

        if (marketId) {
            sql + ` ${HoldingTableService.MARKET_ID} = ?`;
            params.push(marketId);
            addedFilter = true;
        }

        if (assetClassId) {
            sql + ` ${addedFilter ? 'AND' : ''} ${HoldingTableService.ASSET_CLASS_ID} = ?`;
            params.push(assetClassId);
            addedFilter = true;
        }

        if (assetId) {
            sql + ` ${addedFilter ? 'AND' : ''} ${HoldingTableService.ASSET_ID} = ?`;
            params.push(assetId);
            addedFilter = true;
        }

        if (holdingDate) {
            sql + ` ${addedFilter ? 'AND' : ''} ${HoldingTableService.HOLDING_DATE} = ?`;
            params.push(holdingDate);
            addedFilter = true;
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

    public insert(holding: Holding, callback: (err: Error | null) => void): void {
        this.dbService.insertRow(
            `INSERT INTO ${HoldingTableService.TABLE_NAME} (
                ${HoldingTableService.MARKET_ID},
                ${HoldingTableService.ASSET_CLASS_ID},
                ${HoldingTableService.ASSET_ID},
                ${HoldingTableService.RATE},
                ${HoldingTableService.QUANTITY},
                ${HoldingTableService.HOLDING_DATE},
                ${HoldingTableService.CREATEDBY},
                ${HoldingTableService.CREATEDON}
            ) values (?, ?, ?, ?, ?, ?, ?, ?);`,
            Object.values(holding).slice(1),
            callback
        );
    }

    public async insertBulk(holdings: Holding[]): Promise<boolean> {
        let iQs: string[] = [];

        for (let i = 0; i < holdings.length; i += 200) {

            let iQ = `INSERT INTO ${HoldingTableService.TABLE_NAME} (
                ${HoldingTableService.MARKET_ID},
                ${HoldingTableService.ASSET_CLASS_ID},
                ${HoldingTableService.ASSET_ID},
                ${HoldingTableService.RATE},
                ${HoldingTableService.QUANTITY},
                ${HoldingTableService.HOLDING_DATE},
                ${HoldingTableService.CREATEDBY},
                ${HoldingTableService.CREATEDON}
                ) values `;

            const batch = holdings.slice(i, i + 200);
            for (let j = 0; j < batch.length; j++) {
                const holding = batch[j];
                this.sanitise(holding);
                //TODO: possible SQL injection vulnerability
                iQ += `('${holding.marketId}','${holding.assetClassId}','${holding.assetId}',${holding.rate},${holding.quantity},'${this.formatToSQLiteDate(holding.holdingDate)}',${holding.createdBy},'${this.formatToSQLiteDate(holding.createdOn)}')${j === batch.length - 1 ? ';' : ','}`;
            }

            iQs.push(iQ);
        }

        return this.dbService.insertRows(iQs);
    }

    public delete(id: number): void {

    }

    private sanitise(holding: Holding) {
        // holding.isin = holding.isin.replace(/'/g, "''");
        // holding.name = holding.name.replace(/'/g, "''");
        // holding.isinName = holding.isinName.replace(/'/g, "''");
        // holding.symbol = holding.symbol.replace(/'/g, "''");
    }

    private formatToSQLiteDate(date: Date): string {
        return date.toISOString().split('T')[0]; // Extract 'YYYY-MM-DD' from ISO 8601 format
    }
}