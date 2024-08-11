import { DBService } from "../db/db.service";
import { Holding } from "../../models/models";

export class HoldingTableService {
    private static instance: HoldingTableService;
    private dbService: DBService;

    private constructor(dbService: DBService) {
        this.dbService = dbService;
    }

    public static getInstance(dbService: DBService) {
        if(!HoldingTableService.instance) {
            HoldingTableService.instance = new HoldingTableService(dbService);
        }
        
        return HoldingTableService.instance;
    }

    public getCreateQuery(): string {
        return "";
    }

    public getAll(): Holding[] {
        return [];
    }

    public get(id: number): Holding | null {
        return null;
    }

    public insert(): void {

    }

    public insertBulk(): void {

    }

    public delete(id: number): void {
        
    }
}