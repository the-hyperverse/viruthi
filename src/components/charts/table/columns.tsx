"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { EquityHoldingViewModel } from "@/components/viewmodels/viewmodels"
import staticData from "@/data/staticData.json";

export const columns: ColumnDef<EquityHoldingViewModel>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    // {
    //     accessorKey: "isin",
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 ISIN
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         )
    //     },
    //     cell: ({ row }) => <div className="uppercase">{row.getValue("isin")}</div>,
    //     enableSorting: false,
    // },
    {
        accessorKey: "marketId",
        header: () => <div>Market</div>,
        cell: ({ row }) => {
            const marketId = row.getValue("marketId")
            const market = staticData.markets.find(v => v.id === marketId)
            return <div className="font-medium">{market?.symbol ?? "IN"}</div>
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "symbol",
        header: () => <div>Symbol</div>,
        cell: ({ row }) => <div className="font-medium">{row.getValue("symbol")}</div>,
    },
    {
        accessorKey: "holding",
        header: () => <div className="text-right">Holdings</div>,
        cell: ({ row }) => {
            const holding = parseFloat(row.getValue("holding"));
            const holdingDiff = row.original.holdingDiff;
            console.log(row)
            return (
                <div className="text-right">
                    <div className="font-medium">{holding}</div>
                    <div className={`text-xs ${holdingDiff > 0 ? 'text-green-500' : holdingDiff < 0 ? 'text-red-500' : ''}`}>
                        {holdingDiff > 0 ? '+' : ''}{holdingDiff}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "rate",
        header: () => <div className="text-right">Rate</div>,
        cell: ({ row }) => {
            const marketId = row.getValue("marketId")
            const market = staticData.markets.find(v => v.id === marketId)
            const rate = parseFloat(row.getValue("rate"))
            const rateDiff = row.original.rateDiff;
            const formattedRate = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(rate)
            const formattedDiff = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(rateDiff)

            return (
                <div className="text-right">
                    <div className="font-medium">{formattedRate}</div>
                    <div className={`text-xs ${rateDiff > 0 ? 'text-green-500' : rateDiff < 0 ? 'text-red-500' : ''}`}>
                        {rateDiff > 0 ? '+' : ''}{formattedDiff}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const marketId = row.getValue("marketId")
            const market = staticData.markets.find(v => v.id === marketId)
            const amount = parseFloat(row.getValue("amount"))
            const amountDiff = row.original.amountDiff;
            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(amount)
            const formattedDiff = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(amountDiff)

            return (
                <div className="text-right">
                    <div className="font-medium">{formattedAmount}</div>
                    <div className={`text-xs ${amountDiff > 0 ? 'text-green-500' : amountDiff < 0 ? 'text-red-500' : ''}`}>
                        {amountDiff > 0 ? '+' : ''}{formattedDiff}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "investedAmount",
        header: () => <div className="text-right">Invested Amount</div>,
        cell: ({ row }) => {
            const marketId = row.getValue("marketId")
            const market = staticData.markets.find(v => v.id === marketId)
            const amount = parseFloat(row.getValue("investedAmount"))
            const amountDiff = parseFloat(row.getValue("amount")) - amount;
            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(amount)
            const formattedDiff = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(amountDiff)

            return (
                <div className="text-right">
                    <div className="font-medium">{formattedAmount}</div>
                    <div className={`text-xs ${amountDiff > 0 ? 'text-green-500' : amountDiff < 0 ? 'text-red-500' : ''}`}>
                        {amountDiff > 0 ? '+' : ''}{formattedDiff}
                    </div>
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const rowData = row.original
            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-7 w-7 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(rowData.symbol)}
                            >
                                Copy Symbol
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View history</DropdownMenuItem>
                            <DropdownMenuItem>View on trading view</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]

