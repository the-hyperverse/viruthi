import { columns } from "./columns"
import { DataTable } from "./data-table"

// function getData(): Payment[] {
//     // Fetch data from your API here.
//     return [
//         {
//             id: "m5gr84i9",
//             amount: 316,
//             status: "success",
//             email: "ken99@yahoo.com",
//         },
//         {
//             id: "3u1reuv4",
//             amount: 242,
//             status: "success",
//             email: "Abe45@gmail.com",
//         },
//         {
//             id: "derv1ws0",
//             amount: 837,
//             status: "processing",
//             email: "Monserrat44@gmail.com",
//         },
//         {
//             id: "5kma53ae",
//             amount: 874,
//             status: "success",
//             email: "Silas22@gmail.com",
//         },
//         {
//             id: "bhqecj4p",
//             amount: 721,
//             status: "failed",
//             email: "carmella@hotmail.com",
//         },
//         // ... more data
//     ]
// }

// export default function Stocks() {
//     const data = getData()

//     return (
//         <div className="w-full px-4 py-10">
//             <h1 className="text-3xl font-bold mb-4">Stocks</h1>
//             <DataTable columns={columns} data={data} />
//         </div>
//     )
// }

export default function Stocks() {
    return (
        <div className="w-full px-4 py-10">
            <h1 className="text-3xl font-bold mb-4">Equities</h1>
            <DataTable columns={columns} />
        </div>
    )
}
