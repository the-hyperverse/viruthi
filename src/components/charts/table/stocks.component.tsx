import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function Stocks() {
    return (
        <div className="w-full px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">Equities</h1>
            <DataTable columns={columns} />
        </div>
    )
}
