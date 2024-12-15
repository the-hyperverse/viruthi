import { DollarSign } from "lucide-react";
import { CountViewModel } from "../viewmodels/viewmodels";
import CountCard from "./countcard.component";

const data: CountViewModel = {
    title: "US Stocks",
    amount: 2350.45,
    diff: -1.9,
    isDiffPercentage: true,
    unit: "$",
    isUnitPrefix: true,
    icon: DollarSign
}

export default function USStocksCount() {
    return (
        <CountCard countData={data} x-chunk="dashboard-01-chunk-2" />
    )
}