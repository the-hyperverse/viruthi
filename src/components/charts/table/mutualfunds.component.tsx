import { useEffect, useState } from "react"
import { mfColumns } from "./mf-columns"
import { DataTable } from "./data-table"
import { MutualFundHoldingViewModel } from "@/components/viewmodels/viewmodels"

export default function MutualFunds() {
    const [data, setData] = useState<MutualFundHoldingViewModel[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await window.electronAPI.getMutualFundHoldings();
                if (response.status === 200) {
                    setData(response.data as MutualFundHoldingViewModel[]);
                } else {
                    console.error("Failed to fetch mutual funds:", response.message);
                }
            } catch (error) {
                console.error("Error fetching mutual funds:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">Mutual Funds</h1>
            <DataTable columns={mfColumns} data={data} />
        </div>
    )
}
