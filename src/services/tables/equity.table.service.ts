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

    public getAll(offset: number, limit: number, callback: (rows: any[] | undefined) => void): void {
        this.dbService.getRows(
            `SELECT * FROM ${EquityTableService.TABLE_NAME} limit ? offset ?;`,
            [limit, offset],
            (err, rows) => {
                if (err) {
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
            sql += ` ${EquityTableService.ISIN} = ?`;
            addedFilter = true;
            params.push(isin);
        }
        if (marketId) {
            sql += ` ${addedFilter ? 'AND' : '' } ${EquityTableService.MARKET_ID} = ?`;
            params.push(marketId);
        }

        if (params.length === 0) {
            // No filter applied, return all? Or error? returning all for now, but maybe should handle better
            // Or just strip 'WHERE' if no filters.
             sql = `SELECT * FROM ${EquityTableService.TABLE_NAME}`;
        }

        this.dbService.getRows(
            sql + ';',
            params,
            (err, rows) => {
                if (err) {
                    log.error(err);
                    return;
                }
                callback(rows as Equity[]);
            }
        )
    }

    public search(name: string, callback: (rows: Equity[] | undefined) => void): void {
        // Implement search if needed, otherwise leave empty
    }

    public insert(equity: Equity, callback: (err: Error | null) => void): void {
        this.dbService.insertRow(
            `INSERT INTO ${EquityTableService.TABLE_NAME} (
                ${EquityTableService.ISIN},
                ${EquityTableService.NAME},
                ${EquityTableService.ISIN_NAME},
                ${EquityTableService.MARKET_ID},
                ${EquityTableService.SYMBOL}
            ) values (?, ?, ?, ?, ?);`,
            Object.values(equity),
            callback
        );
    }

    public async insertBulk(equities: Equity[]): Promise<boolean> {
        let iQs: string[] = [];

        for (let i = 0; i < equities.length; i += 200) {

            let iQ = `INSERT INTO ${EquityTableService.TABLE_NAME} (
                ${EquityTableService.ISIN},
                ${EquityTableService.NAME},
                ${EquityTableService.ISIN_NAME},
                ${EquityTableService.MARKET_ID},
                ${EquityTableService.SYMBOL}
            ) values `;

            const batch = equities.slice(i, i + 200);
            for (let j = 0; j < batch.length; j++) {
                const equity = batch[j];
                this.sanitise(equity);
                //TODO: possible SQL injection vulnerability - parameterized queries are safer but insertRows takes string array.
                // Assuming sanitise works for now, keeping as is but fixed logic.
                iQ += `('${equity.isin}','${equity.name}','${equity.isinName}',${equity.marketId},'${equity.symbol}')${j === batch.length - 1 ? ';' : ','}`;
            }

            iQs.push(iQ);
        }

        return this.dbService.insertRows(iQs);
    }

    public delete(id: number): void {

    }

    private sanitise(equity: Equity) {
        if (equity.isin) equity.isin = equity.isin.replace(/['"\\]/g, '');
        if (equity.name) equity.name = equity.name.replace(/['"\\]/g, '');
        if (equity.isinName) equity.isinName = equity.isinName.replace(/['"\\]/g, '');
        if (equity.symbol) equity.symbol = equity.symbol.replace(/['"\\]/g, '');
    }
}
