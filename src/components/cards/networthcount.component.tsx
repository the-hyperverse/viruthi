import { ChartNoAxesCombined } from "lucide-react";
import { CountViewModel } from "../viewmodels/viewmodels";
import CountCard from "./countcard.component";
import { STATUS } from "@/models/constants.core";


const data: CountViewModel = {
    title: "Net Worth",
    amount: 0,
    diff: 0,
    isDiffPercentage: true,
    unit: "$",
    isUnitPrefix: true,
    icon: ChartNoAxesCombined
};

const response = await window.electronAPI.getNetWorth();
if (response.status === STATUS.OK && response.data) {
    data.amount = response.data.amount;
    data.diff = response.data.diff;
}

export default function NetworthCount() {
    return (
        <CountCard countData={data} x-chunk="dashboard-01-chunk-0" />
    )
}