import { DBService } from "../db/db.service";
import { MutualFund } from "../../models/models";

export class MutualFundTableService {
    private static instance: MutualFundTableService;
    private dbService: DBService;

    private constructor(dbService: DBService) {
        this.dbService = dbService;
    }

    public static getInstance(dbService: DBService) {
        if(!MutualFundTableService.instance) {
            MutualFundTableService.instance = new MutualFundTableService(dbService);
        }
        
        return MutualFundTableService.instance;
    }

    public getCreateQuery(): string {
        return "";
    }

    public getAll(): MutualFund[] {
        return [];
    }

    public get(id: number): MutualFund | null {
        return null;
    }

    public insert(): void {

    }

    public insertBulk(): void {

    }

    public delete(id: number): void {
        
    }
}