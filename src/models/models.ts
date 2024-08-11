import { IpcRendererEvent } from "electron";

export interface FormSubmissionReply {
    success: boolean;
    id?: number
}

export interface UserData {
    id: number;
    name: string;
    age: number;
}

export interface FormData {
    name: string;
    age: number;
}

export type FormSubmissionReplyCallback = (event: IpcRendererEvent, response: FormSubmissionReply) => void;
export type DataRetrievedCallback = (event: IpcRendererEvent, rows: UserData[]) => void;