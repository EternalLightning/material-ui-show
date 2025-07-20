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


export function CustomizedLineChart(props: { data: number[], xLabel: string, yLabel: string, sLabel: string}) {
    return (
        <LineChart
            height={350}
            xAxis={[{
                label: props.xLabel,
                scaleType: 'band',
                data: Array.from({length: 24}, (_, i) => `${i + 1}`)
            }]}
            yAxis={[{
                label: props.yLabel,
            }]}
            slotProps={{
                legend: {
                    hidden: true,
                },
            }}
            series={[
                {
                    id: 'irradiance',
                    label: props.sLabel,
                    color: '#009898',
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
                    <stop offset="10%" stopColor="#009898"/>
                    <stop offset="90%" stopColor="white"/>
                </linearGradient>
            </defs>
        </LineChart>
    )
}