import { IndianRupee } from "lucide-react";
import { CountViewModel } from "../viewmodels/viewmodels";
import CountCard from "./countcard.component";

const data: CountViewModel = {
    title: "IN Stocks",
    amount: 12234.97,
    diff: 6.20,
    isDiffPercentage: true,
    unit: "₹",
    isUnitPrefix: true,
    icon: IndianRupee
}

export default function INStocksCount() {
    return (
        <CountCard countData={data} x-chunk="dashboard-01-chunk-1" />
    )
}