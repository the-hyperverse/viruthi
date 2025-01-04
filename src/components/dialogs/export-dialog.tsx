import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import staticData from "@/data/staticData.json"
import { useState } from "react"

export function ExportDialog({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const [market, setMarket] = useState<string>("")
    const [assetClass, setAssetClass] = useState<string>("")

    const handleExport = () => {
        if (!market || !assetClass) {
            return
        }
        // Handle export logic here
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Export Data</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Select onValueChange={setMarket}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Market" />
                            </SelectTrigger>
                            <SelectContent>
                                {staticData.markets.map((market) => (
                                    <SelectItem key={market.id} value={market.id.toString()}>
                                        {market.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Select onValueChange={setAssetClass}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Asset Class" />
                            </SelectTrigger>
                            <SelectContent>
                                {staticData.assetClasses.map((assetClass) => (
                                    <SelectItem key={assetClass.id} value={assetClass.id.toString()}>
                                        {assetClass.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button 
                        onClick={handleExport}
                        disabled={!market || !assetClass}
                    >
                        Export
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
