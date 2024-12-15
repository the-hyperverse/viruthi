"use client"

import * as React from "react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavSupport } from "@/components/sidebar/nav-support"
import { NavUser } from "@/components/sidebar/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavData } from "../viewmodels/mockdata"
import { NavSettings } from "./nav-settings"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-sidebar-primary-foreground text-sidebar-primary">
                                    {/* <Command className="size-4" /> */}
                                    <img src="assets/images/viruthi-black-nobg.png" alt="V" className="" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Viruthi</span>
                                    <span className="truncate text-xs">Master your money</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={NavData.navMain} className="mt-2" />
                <NavSettings items={NavData.navSettings} />
                <NavSupport items={NavData.navSupport} className="mt-auto" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={NavData.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
