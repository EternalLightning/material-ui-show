import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from '../components/ChartUserByCountry';
import CustomizedTreeView from '../components/CustomizedTreeView';
import CustomizedDataGrid from '../components/CustomizedDataGrid';
import PageViewsBarChart from '../components/PageViewsBarChart';
import SessionsChart from '../components/SessionsChart';
import Card from '@mui/material/Card';
import {bus_columns, bus_rows} from '../internals/data/schemeData1'
import {DataGrid} from "@mui/x-data-grid";


export default function Scheme1() {
    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Card variant="outlined">
                <Typography component="h2" variant="h6" sx={{mb: 2}}>
                    拓扑信息
                </Typography>
                <Typography variant="body1" sx={{mb: 2}}>
                    节点名称：IEEE33
                </Typography>
                <Grid container spacing={2} columns={12} sx={{alignItems: 'center', justifyContent: 'center'}}>
                    <Grid size={{xs: 12, md: 6}}>
                        <DataGrid
                            rows={bus_rows}
                            columns={bus_columns}
                            initialState={{
                                pagination: {paginationModel: {pageSize: 50}},
                            }}
                            pageSizeOptions={[50, 100]}
                            disableColumnResize
                            density="compact"
                        />
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>

                    </Grid>
                </Grid>
            </Card>

            <Grid
                container
                spacing={2}
                columns={12}
                sx={{mb: (theme) => theme.spacing(2)}}
            >
                {/* 新增内容：拓扑信息 */}
            </Grid>
            <Typography component="h2" variant="h6" sx={{mb: 2}}>
                详细信息
            </Typography>
            <Grid container spacing={2} columns={12}>
                <Grid size={{xs: 12, md: 6}}>
                    <SessionsChart/>
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <PageViewsBarChart/>
                </Grid>
                <Grid size={{xs: 12, lg: 9}}>
                    <CustomizedDataGrid/>
                </Grid>
                <Grid size={{xs: 12, lg: 3}}>
                    <Stack gap={2} direction={{xs: 'column', sm: 'row', lg: 'column'}}>
                        <CustomizedTreeView/>
                        <ChartUserByCountry/>
                    </Stack>
                </Grid>
            </Grid>
            <Copyright sx={{my: 4}}/>
        </Box>
    );
}