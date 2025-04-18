import {createContext} from "react";
import {GridColDef, GridRowsProp} from "@mui/x-data-grid";


export interface ContextType {
    openSubItems?: string | null;
    setOpenSubItems?: (path: string | null) => void;
}

export const context = createContext<ContextType>({});

export interface SchemeType {
    data: {
        bus_rows: GridRowsProp;
        bus_columns: GridColDef[];
        branch_rows: GridRowsProp;
        branch_columns: GridColDef[];
        gen_rows: GridRowsProp;
        gen_columns: GridColDef[];
        solar_rows: GridRowsProp;
        solar_columns: GridColDef[];
        wind_rows: GridRowsProp;
        wind_columns: GridColDef[];
        storage_rows: GridRowsProp;
        storage_columns: GridColDef[];
        network_name: string;
        nt: number;
        gen_num: number;
        solar_num: number;
        wind_num: number;
        storage_num: number;
        price: number | number[];
        solar_irradiance: number | number[];
        wind_speed: number | number[];
        pd: number[] | number[][];
        qd: number[] | number[][];
    }
}