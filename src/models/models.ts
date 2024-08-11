export interface Market {
    id: number;
    name: string;
    symbol: string;
    currency: string;
}

export interface AssetClass {
    id: number;
    name: string;
    symbol: string;
    unit: string;
}

export interface Gold {
    id: number;
    name: string;
    karat: number;
}

export interface Equity {
    isin: string;
    name: string;
    marketId: number;
    symbol: string;
}

export interface MutualFund {
    folioNumber: string;
    name: string;
    marketId: number;
}

export interface Holding {
    id: number;
    marketId: number;
    assetClassId: number;
    assetId: string;
    rate: number;
    quantity: number;
    holdingDate: Date;
    createdBy: number;
    createdOn: Date;
}
