import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {axisClasses} from "@mui/x-charts/ChartsAxis";
import {LineChart, lineElementClasses} from "@mui/x-charts/LineChart";

export function CustomizedDataGrid(props: {
    rows: readonly any[] | undefined,
    columns: readonly GridColDef<any>[]
}) {
    return (
        <DataGrid
            rows={props.rows}
            columns={props.columns}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            initialState={{
                pagination: {paginationModel: {pageSize: 20}},
            }}
            pageSizeOptions={[10, 20, 50]}
            disableColumnResize
            density="compact"
            slotProps={{
                filterPanel: {
                    filterFormProps: {
                        logicOperatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                        },
                        columnInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: {mt: 'auto'},
                        },
                        operatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: {mt: 'auto'},
                        },
                        valueInputProps: {
                            InputComponentProps: {
                                variant: 'outlined',
                                size: 'small',
                            },
                        },
                    },
                },
            }}
        />
    );
}


export function CustomizedLineChart(props: { data: number[] }) {
    return (
        <LineChart
            height={250}
            xAxis={[{
                scaleType: 'band', data: Array.from({length: 24}, (_, i) => `${i + 1}时`)
            }]}
            yAxis={[{
                label: '辐照度(%)',
            }]}
            series={[
                {
                    id: 'irradiance',
                    color: '#87CEFA',
                    data: props.data,
                    stack: 'total',
                    area: true,
                }
            ]}
            sx={{
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                    transform: 'translate(-10px, 0)',
                },
                [`& .${lineElementClasses.root}`]: {
                    strokeDasharray: '10 5',
                    strokeWidth: 4,
                },
                '& .MuiAreaElement-series-irradiance': {
                    fill: "url('#myGradient')",
                    filter: 'none',
                },
            }}
        >
            <defs>
                <linearGradient id="myGradient" gradientTransform="rotate(90)">
                    <stop offset="10%" stopColor="#87CEFA"/>
                    <stop offset="90%" stopColor="white"/>
                </linearGradient>
            </defs>
        </LineChart>
    )
}