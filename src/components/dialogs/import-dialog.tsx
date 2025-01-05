import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import staticData from "@/data/staticData.json";
import { useRef, useState } from "react";
import { ResponseDTO } from "../../models/models";
import { STATUS } from "../../models/constants.core";
import { useToast } from "../hooks/use-toast";
import log from "electron-log/renderer";

export function ImportDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [importType, setImportType] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { toast } = useToast();

    const validateForm = () => {
        setError("");

        if (!importType) {
            setError("Please select an import type.");
            return false;
        }

        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            setError("Please select a valid file.");
            return false;
        }

        return true;
    };

    const handleFileUpload = async () => {
        if (!validateForm()) {
            return;
        }

        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            return;
        }

        const formData = {
            filePath: window.electronAPI.getFilePath(file),
            importType: importType
        }

        try {
            const response: ResponseDTO = await window.electronAPI.importFile(formData);

            log.debug(response);
            if (response.status !== STATUS.OK) {
                setError(response.message);
            } else {
                toast({
                    title: "Success!",
                    description: "File has been uploaded successfully.",
                });
            }
        } catch (error) {
            toast({
                title: "Error!",
                description: "An error occurred during the file upload.",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import Data</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Select onValueChange={setImportType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Import Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {staticData.importTypes.map((importType) => (
                                    <SelectItem
                                        key={importType.id}
                                        value={importType.id.toString()}
                                    >
                                        {importType.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <input
                            type="file"
                            accept=".csv"
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            ref={fileInputRef}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Button onClick={handleFileUpload} disabled={!importType}>
                            Upload
                        </Button>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
