"use client"

import { PiggyBank } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"
import { AssetDistributionViewModel } from "@/components/viewmodels/viewmodels"

const chartData: AssetDistributionViewModel[] = [
    { asset: "equity", amount: 900, fill: "var(--color-equity)" },
    { asset: "mf", amount: 200, fill: "var(--color-mf)" },
    { asset: "gold", amount: 180, fill: "var(--color-gold)" },
    { asset: "rest", amount: 200, fill: "var(--color-rest)" },
    { asset: "cbond", amount: 173, fill: "var(--color-cbond)" },
    // { asset: "sbond", amount: 150, fill: "var(--color-sbond)" },
    // { asset: "debt", amount: 190, fill: "var(--color-debt)" },
]

const chartConfig = {
    asset: {
        label: "Asset",
    },
    equity: {
        label: "Equity",
        color: "hsl(var(--chart-1))",
    },
    mf: {
        label: "Mutual Fund",
        color: "hsl(var(--chart-2))",
    },
    gold: {
        label: "Gold",
        color: "hsl(var(--chart-3))",
    },
    rest: {
        label: "Real Est.",
        color: "hsl(var(--chart-4))",
    },
    cbond: {
        label: "Corp. Bond",
        color: "hsl(var(--chart-5))",
    },
    // sbond: {
    //     label: "Sovn. Bond",
    //     color: "hsl(var(--chart-6))",
    // },
    // debt: {
    //     label: "Debt",
    //     color: "hsl(var(--chart-7))",
    // },
} satisfies ChartConfig

export function AssetDistribution() {

    return (
        <Card className="flex flex-col w-full max-w-3xl max-h-[400px]">
            <CardHeader className="items-center pb-0 flex flex-row justify-between space-y-0 ">
                <CardTitle>Asset Distribution</CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="amount" nameKey="asset" />
                        <ChartLegend content={<ChartLegendContent nameKey="asset" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    +20.1% from last month <TrendingUp className="h-4 w-4" />
                </div>
            </CardFooter> */}
        </Card>
    )
}
