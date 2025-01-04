"use client"

import { useState } from "react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { NavElementsViewModel } from "../viewmodels/viewmodels"
import { ImportDialog } from "../dialogs/import-dialog"
import { ExportDialog } from "../dialogs/export-dialog"

export function NavSettings({ items }: { items: NavElementsViewModel[] }) {
    const [importOpen, setImportOpen] = useState(false)
    const [exportOpen, setExportOpen] = useState(false)

    const handleClick = (title: string) => {
        if (title === "Import Data") {
            setImportOpen(true)
        } else if (title === "Export Data") {
            setExportOpen(true)
        }
    }

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <button onClick={() => handleClick(item.title)}>
                                <item.icon />
                                <span>{item.title}</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <ImportDialog open={importOpen} onOpenChange={setImportOpen} />
            <ExportDialog open={exportOpen} onOpenChange={setExportOpen} />
        </SidebarGroup>
    )
}
