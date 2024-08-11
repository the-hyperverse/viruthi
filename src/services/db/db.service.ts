import sqlite3 from 'sqlite3';
import log from 'electron-log/main';
import { DB_PATH } from '../../models/constants';

export class DBService {
    private static instance: DBService;
    private db: sqlite3.Database;

    private constructor() {
        try {
            this.db = new sqlite3.Database(DB_PATH, (err: Error | null) => {
                if (err) {
                    log.error('Failed to open database:', err.message);
                } else {
                    log.log('Connected to the database.');
                }
            });
        } catch (error) {
            log.error('Database initialization error:', (error as Error).message);
            throw error;
        }
    }

    public static getInstance(): DBService {
        if (!DBService.instance) {
            DBService.instance = new DBService();
        }
        return DBService.instance;
    }

    public createTables(cQs: string[]): void {
        this.db.serialize(() => {
            this.db.run("begin transaction");
            
            cQs.forEach((cQ) => {
                this.db.run(cQ, (err: Error | null) => {
                    if (err) {
                        log.error('Failed to create table:', err?.message);
                    }
                });
            });

            this.db.run("commit");
        });
        log.debug('Tables are created.');
    }

    public getRows(sQ: string, callback: (err: Error | null, rows?: []) => void): void {
        this.db.all(sQ, callback);
    }

    public insertRow(iQ: string, valList: any[], callback: (err: Error | null) => void): void {
        // this.db.run(
        //     `INSERT INTO sharks (name, color, weight) VALUES (?, ?, ?)`,
        //     [name, color, weight],
        //     (err: Error | null) => {
        //         if (err) {
        //             log.error(err.message);
        //         }
        //     }
        // );
        this.db.run(iQ, valList, callback);
    }

    public insertRows(iQ: string, valList: any[][]): void {
        // var params = [[1,2],[3,4],[5,6],[7,8]];
        // this.db.serialize(() => {
        //     this.db.run("begin transaction");

        //     for (var i = 0; i < params.length; i++) {
        //         this.db.run("insert into data(num1, num2) values (?, ?)", params[i][0], params[i][1]);
        //     }

        //     this.db.run("commit");
        // });
        this.db.serialize(() => {
            this.db.run("begin transaction");

            valList.forEach(row => {
                this.db.run(iQ, row, (err: Error | null) => {
                    log.error('Failed to insert a row in bulk insert:', err?.message)
                });
            });

            this.db.run("commit");
        });
    }


    public updateRow(uQ: string, valList: any[]): void {
        this.db.run(uQ, valList, (err: Error | null) => {
            log.error('Failed to update row:', err?.message)
        });
    }

    public deleteRow(dQ: string): void {
        this.db.run(dQ, (err: Error | null) => {
            log.error('Failed to delete row:', err?.message)
        });
    }

    public deleteAllRows(tableName: string): void {
        this.db.run(`DELETE FROM ${tableName}`, (err: Error | null) => {
            log.error('Failed to delete rows:', err?.message)
        });
    }

    public close(): void {
        if (this.db) {
            this.db.close((err: Error | null) => {
                if (err) {
                    log.error('Failed to close database:', err.message);
                } else {
                    log.debug('Database closed.');
                }
            });
        }
    }
}
