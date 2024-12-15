import { ChartNoAxesCombined } from "lucide-react";
import { CountViewModel } from "../viewmodels/viewmodels";
import CountCard from "./countcard.component";

const data: CountViewModel = {
    title: "Net Worth",
    amount: 45321.12,
    diff: 12.20,
    isDiffPercentage: true,
    unit: "$",
    isUnitPrefix: true,
    icon: ChartNoAxesCombined
}

export default function NetworthCount() {
    return (
        <CountCard countData={data} x-chunk="dashboard-01-chunk-0" />
    )
}