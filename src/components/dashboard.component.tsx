import { AppSidebar } from "@/components/sidebar/app-sidebar"
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card"
import { DollarSign, Medal, ChartNoAxesCombined, ChartCandlestick, IndianRupee } from "lucide-react"

import "@/assets/css/globals.css";
import { Donut } from "./charts/pie/donut.component"
import { LineChartComponent } from "./charts/graph/areachart.component"
import Stocks from "./charts/table/stocks.component"
import NetworthCount from "./cards/networthcount.component"
import INStocksCount from "./cards/incount.component"
import USStocksCount from "./cards/uscount.component"
import GoldCount from "./cards/goldcount.component"

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
						<NetworthCount />
						<INStocksCount />
						<USStocksCount />
						<GoldCount />
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
