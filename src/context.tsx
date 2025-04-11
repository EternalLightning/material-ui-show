import {createContext} from "react";

export interface ContextType {
    openSubItems?: string | null;
    setOpenSubItems?: (path: string | null) => void;
}

export const context = createContext<ContextType>({});
