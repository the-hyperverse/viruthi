"use client"

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

const fullChartData = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
	{ month: "July", desktop: 224 },
	{ month: "August", desktop: 254 },
	{ month: "September", desktop: 314 },
	{ month: "October", desktop: 114 },
	{ month: "November", desktop: 64 },
	{ month: "December", desktop: 284 },
]

export function LineChartComponent() {
	const [timeRange, setTimeRange] = useState("12")

	const chartData = fullChartData.slice(-parseInt(timeRange))

	return (

		<Card className="md:col-span-3 max-h-[400px]">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle>Wealth Growth</CardTitle>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select time range" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">Last 1 months</SelectItem>
						<SelectItem value="3">Last 3 months</SelectItem>
						<SelectItem value="6">Last 6 months</SelectItem>
						<SelectItem value="12">Last 12 months</SelectItem>
						<SelectItem value="24">Last 24 months</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={{
						desktop: {
							label: "Desktop",
							color: "hsl(var(--chart-1))",
						},
					}}
					className="w-full h-[200px] sm:h-[250px]"
				>
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={chartData}
							margin={{
								top: 20,
								right: 20,
								left: 2npm0,
								bottom: 0,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tick={{ fontSize: 12 }}
								interval={0}
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tick={{ fontSize: 12 }}
							/>
							<ChartTooltip content={<ChartTooltipContent indicator="line" />} />
							<Area
								type="natural"
								dataKey="desktop"
								stroke="var(--color-desktop)"
								fill="var(--color-desktop)"
								fillOpacity={0.6}
								dot={{ stroke: 'var(--color-desktop)', strokeWidth: 2, r: 4, fill: 'white' }}
								activeDot={{ r: 6, stroke: 'var(--color-desktop)', strokeWidth: 2, fill: 'white' }}
							>
								<LabelList
									dataKey="desktop"
									position="top"
									offset={10}
									content={({ x, y, value }) => (
										<text
											x={x}
											y={y}
											fill="var(--color-desktop)"
											fontSize={12}
											textAnchor="middle"
											dy={-10}
										>
											{value}
										</text>
									)}
								/>
							</Area>
						</AreaChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none text-muted-foreground">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
			</CardFooter>
		</Card>
	)
}