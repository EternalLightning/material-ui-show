import {createContext} from "react";

export interface PathNameContextType {
    openSubItems?: string | null;
    setOpenSubItems?: (path: string | null) => void;
    path?: string;
    setPath?: (path: string) => void;
    pathName?: string;
    setPathName?: (pathName: string) => void;
}

export const PathNameContext = createContext<PathNameContextType>({});
