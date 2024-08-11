import { DBService } from "../db/db.service";
import { Equity } from "../../models/models";

export class EquityTableService {
    private static instance: EquityTableService;
    private dbService: DBService;

    private constructor(db: DBService) {
        this.dbService = db;
    }

    public static getInstance(dbService: DBService) {
        if(!EquityTableService.instance) {
            EquityTableService.instance = new EquityTableService(dbService);
        }
        
        return EquityTableService.instance;
    }

    public getCreateQuery(): string {
        return "";
    }

    public getAll(): Equity[] {
        return [];
    }

    public get(id: number): Equity | null {
        return null;
    }

    public insert(): void {

    }

    public insertBulk(): void {

    }

    public delete(id: number): void {

    }
}