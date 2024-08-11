import log from 'electron-log/main';
import { DBService } from "../db/db.service";
import { AssetClass, Gold, Market } from '../../models/models';
import * as staticData from "../../data/staticData.json";

export class TableService {
    private static instance: TableService;
    private dbService: DBService;

    private constructor() {
        this.dbService = DBService.getInstance();
    }

    public static getInstance() {
        if (!TableService.instance) {
            TableService.instance = new TableService();
        }
        return TableService.instance;
    }

    public prepareTables(): void {
        if (!staticData || !staticData.markets || !staticData.assetClasses || !staticData.golds) {
            log.error('Static data is empty.');
            throw new Error('Static data is empty.');
        }
    
        //this.dbService.createTables([""])
        log.info('Tables are created.')
    }

    /* Market APIs */
    public getMarkets(): Market[] {
        return staticData.markets;
    }

    public getMarket(id: number): Market | null {
        return staticData.markets.find(market => market.id == id) ?? null;
    }

    /* Asset Class APIs */
    public getAssetClasses(): AssetClass[] {
        return staticData.assetClasses;
    }

    public getAssetClass(id: number): AssetClass | null {
        return staticData.assetClasses.find(assetClass => assetClass.id == id) ?? null;
    }

    /* Gold asset APIs */
    public getGoldTypes(): Gold[] {
        return staticData.golds;
    }

    public getGoldType(id: number): Gold | null {
        return staticData.golds.find(goldType => goldType.id == id) ?? null;
    }


    /* DB utility functions */
    public closeDB(): void {
        this.dbService.close();
        log.info('Database closed.');
    }
}