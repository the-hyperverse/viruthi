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
import { MutualFundHoldingViewModel } from "@/components/viewmodels/viewmodels"
import staticData from "@/data/staticData.json";

export const mfColumns: ColumnDef<MutualFundHoldingViewModel>[] = [
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
        accessorKey: "folioNumber",
        header: () => <div>Folio</div>,
        cell: ({ row }) => <div className="font-medium">{row.getValue("folioNumber")}</div>,
    },
    {
        accessorKey: "holding",
        header: () => <div className="text-right">Units</div>,
        cell: ({ row }) => {
            const holding = parseFloat(row.getValue("holding"));
            const holdingDiff = row.original.holdingDiff;
            const percentageChange = holding ? (holdingDiff / (holding - holdingDiff)) * 100 : 0;

            return (
                <div className="text-right space-y-1">
                    <div className="font-medium">{holding.toFixed(3)}</div>
                    <div className="flex items-center justify-end gap-2 text-xs">
                        <span className={`${holdingDiff > 0 ? 'text-green-500' : holdingDiff < 0 ? 'text-red-500' : ''}`}>
                            {holdingDiff > 0 ? '+' : ''}{holdingDiff}
                        </span>
                        <span className={`${holdingDiff > 0 ? 'text-green-500' : holdingDiff < 0 ? 'text-red-500' : ''}`}>
                            ({percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(2)}%)
                        </span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "rate",
        header: () => <div className="text-right">NAV</div>,
        cell: ({ row }) => {
            const marketId = row.getValue("marketId")
            const market = staticData.markets.find(v => v.id === marketId)
            const rate = parseFloat(row.getValue("rate"))
            const rateDiff = row.original.rateDiff;
            const percentageChange = rate ? (rateDiff / (rate - rateDiff)) * 100 : 0;

            const formattedRate = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(rate)
            const formattedDiff = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(rateDiff)

            return (
                <div className="text-right space-y-1">
                    <div className="font-medium">{formattedRate}</div>
                    <div className="flex items-center justify-end gap-2 text-xs">
                        <span className={`${rateDiff > 0 ? 'text-green-500' : rateDiff < 0 ? 'text-red-500' : ''}`}>
                            {rateDiff > 0 ? '+' : ''}{formattedDiff}
                        </span>
                        <span className={`${rateDiff > 0 ? 'text-green-500' : rateDiff < 0 ? 'text-red-500' : ''}`}>
                            ({percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(2)}%)
                        </span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Current Value</div>,
        cell: ({ row }) => {
            const marketId = row.getValue("marketId")
            const market = staticData.markets.find(v => v.id === marketId)
            const amount = parseFloat(row.getValue("amount"))
            const amountDiff = row.original.amountDiff;
            const percentageChange = amount ? (amountDiff / (amount - amountDiff)) * 100 : 0;

            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(amount)
            const formattedDiff = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(amountDiff)

            return (
                <div className="text-right space-y-1">
                    <div className="font-medium">{formattedAmount}</div>
                    <div className="flex items-center justify-end gap-2 text-xs">
                        <span className={`${amountDiff > 0 ? 'text-green-500' : amountDiff < 0 ? 'text-red-500' : ''}`}>
                            {amountDiff > 0 ? '+' : ''}{formattedDiff}
                        </span>
                        <span className={`${amountDiff > 0 ? 'text-green-500' : amountDiff < 0 ? 'text-red-500' : ''}`}>
                            ({percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(2)}%)
                        </span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "investedAmount",
        header: () => <div className="text-right">Invested Value</div>,
        cell: ({ row }) => {
            const marketId = row.getValue("marketId")
            const market = staticData.markets.find(v => v.id === marketId)
            const investedAmount = parseFloat(row.getValue("investedAmount"));
            const currentAmount = parseFloat(row.getValue("amount"));
            const amountDiff = currentAmount - investedAmount;
            const percentageChange = investedAmount ? ((currentAmount - investedAmount) / investedAmount) * 100 : 0;
            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(investedAmount)
            const formattedDiff = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: market?.currency ?? "INR",
            }).format(amountDiff)

            return (
                <div className="text-right">
                    <div className="font-medium">{formattedAmount}</div>
                    <div className="flex items-center justify-end gap-2 text-xs">
                        <span className={`${amountDiff > 0 ? 'text-green-500' : amountDiff < 0 ? 'text-red-500' : ''}`}>
                            {amountDiff > 0 ? '+' : ''}{formattedDiff}
                        </span>
                        <span className={`${amountDiff > 0 ? 'text-green-500' : amountDiff < 0 ? 'text-red-500' : ''}`}>
                            ({percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(2)}%)
                        </span>
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
                                onClick={() => navigator.clipboard.writeText(rowData.folioNumber)}
                            >
                                Copy Folio
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View history</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
