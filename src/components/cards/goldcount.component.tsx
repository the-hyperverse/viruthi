import { Medal } from "lucide-react";
import { CountViewModel } from "../viewmodels/viewmodels";
import CountCard from "./countcard.component";

const data: CountViewModel = {
    title: "Gold",
    amount: 18,
    diff: 1,
    isDiffPercentage: false,
    unit: "g",
    isUnitPrefix: false,
    icon: Medal
}

export default function GoldCount() {
    return (
        <CountCard countData={data} x-chunk="dashboard-01-chunk-3" />
    )
}