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
import { useRef, useState } from "react"

export function ImportDialog({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [market, setMarket] = useState<string>("")
    const [assetClass, setAssetClass] = useState<string>("")
    const [error, setError] = useState<string>("")

    const validateForm = () => { 
        setError("");
        if (!market) {
            setError("Please select a market");
            return false;
        }
        if (!assetClass) {
            setError("Please select an asset class");
            return false;
        }

        const file = fileInputRef.current?.files?.[0]; // Get the selected file
        if (!file) {
            setError("Please select a file");
            return false;
        }

        return true;
    };

    const handleFileUpload = () => {
        if (!validateForm()) {
            return;
        };

        // Handle file upload logic here
        const file = fileInputRef.current?.files?.[0];
        console.log("Uploading file:", file);
        console.log("Selected market:", market);
        console.log("Selected asset class:", assetClass);

        // Example: upload the file using FormData
        const formData = new FormData();
        //formData.append("file", file);
        formData.append("market", market);
        formData.append("assetClass", assetClass);

        // Perform upload logic here (e.g., API call)
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import Data</DialogTitle>
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
                    <div className="grid gap-2">
                        {/* File Input */}
                        <input
                            type="file"
                            accept=".csv,.xlsx"
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            ref={fileInputRef}
                        />
                    </div>
                    <div className="grid gap-2">
                        {/* Upload Button */}
                        <Button onClick={handleFileUpload} disabled={!market || !assetClass}>
                            Upload
                        </Button>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
