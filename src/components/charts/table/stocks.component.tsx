import { useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { EquityHoldingViewModel } from "@/components/viewmodels/viewmodels"

export default function Stocks() {
    const [data, setData] = useState<EquityHoldingViewModel[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await window.electronAPI.getEquityHoldings();
                if (response.status === 200) {
                    setData(response.data as EquityHoldingViewModel[]);
                } else {
                    console.error("Failed to fetch equities:", response.message);
                }
            } catch (error) {
                console.error("Error fetching equities:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">Equities</h1>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
