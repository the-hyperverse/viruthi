import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card"
import { DollarSign, Medal, ChartNoAxesCombined, ChartCandlestick } from "lucide-react"

import "@/assets/css/globals.css";
import { Donut } from "../charts/pie/donut.component"
import { LineChartComponent } from "../charts/graph/areachart.component"
import Stocks from "../charts/table/stocks.component"

export function Dashboard() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Wealth Dashboard
									</BreadcrumbLink>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>

				<main className="flex flex-1 flex-col p-4 md:p-8">
					<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
						<Card x-chunk="dashboard-01-chunk-0">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Net Worth
								</CardTitle>
								<DollarSign className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">$45,231.89</div>
								<p className="text-xs text-muted-foreground">
									+20.1% from last month
								</p>
							</CardContent>
						</Card>
						<Card x-chunk="dashboard-01-chunk-1">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">IN Stocks</CardTitle>
								<ChartNoAxesCombined className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">+2350</div>
								<p className="text-xs text-muted-foreground">
									+180.1% from last month
								</p>
							</CardContent>
						</Card>
						<Card x-chunk="dashboard-01-chunk-2">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">US Stocks</CardTitle>
								<ChartCandlestick className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">+12,234</div>
								<p className="text-xs text-muted-foreground">
									+19% from last month
								</p>
							</CardContent>
						</Card>
						<Card x-chunk="dashboard-01-chunk-3">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Gold</CardTitle>
								<Medal className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">+573</div>
								<p className="text-xs text-muted-foreground">
									+201 since last hour
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-[30px]">
						<Donut />
						<LineChartComponent />
					</div>
					<div className="grid gap-4 pt-2 md:grid-cols-1 md:gap-8 lg:grid-cols-1">
						<Stocks />
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
