"use client"

import { TrendingUp } from "lucide-react"
import { AreaChart, CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer, XAxis } from "recharts"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
	{ month: "July", desktop: 214, mobile: 140 },
	{ month: "August", desktop: 214, mobile: 140 },
	{ month: "September", desktop: 214, mobile: 140 },
	{ month: "October", desktop: 214, mobile: 140 },
	{ month: "November", desktop: 214, mobile: 140 },
	{ month: "December", desktop: 214, mobile: 140 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	mobile: {
		label: "Mobile",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig

export function LineChartComponent() {
	return (

		<Card className="md:col-span-3 max-h-[400px]">
          <CardHeader>
            <CardTitle>Line Chart - Label</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                desktop: {
                  label: "Desktop",
                  color: "hsl(var(--chart-1))",
                },
                mobile: {
                  label: "Mobile",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="w-full h-[200px] sm:h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 20,
					right: 10,
					left: 10,
					bottom: 0,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 12 }}
                    interval={0}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-desktop)",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  >
                    <LabelList
                      position="top"
                      offset={8}
                      className="fill-foreground"
                      fontSize={10}
                    />
                  </Line>
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
