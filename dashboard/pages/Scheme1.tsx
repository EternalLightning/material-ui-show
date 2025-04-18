import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import {
    branch_columns,
    branch_rows,
    bus_columns,
    bus_rows,
    gen_columns,
    gen_rows,
    solar_columns,
    solar_rows,
    storage_columns,
    storage_rows,
    wind_columns,
    wind_rows,
} from '../internals/data/schemeData1'
import CustomizedDataGrid from "../components/CustomizedDataComponents";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import {BarChart} from "@mui/x-charts/BarChart";
import {axisClasses} from '@mui/x-charts/ChartsAxis';


export default function Scheme1() {
    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1900px'}}}>
            <Typography component="h2" variant="h6" gutterBottom>
                方案详细信息
            </Typography>
            <Card variant="outlined" sx={{marginBottom: 3}}>
                <Typography component="h1" variant="subtitle1" gutterBottom>
                    拓扑信息
                </Typography>
                <Typography variant="body1" gutterBottom>
                    网络名称：IEEE33
                </Typography>
                <Grid container spacing={2} columns={12}>
                    <Grid size={{xs: 12, md: 12, lg: 12, xl: 6}}>
                        <CustomizedDataGrid rows={bus_rows} columns={bus_columns}/>
                    </Grid>
                    <Grid size={{xs: 12, md: 12, lg: 12, xl: 6}}>
                        <CustomizedDataGrid rows={branch_rows} columns={branch_columns}/>
                    </Grid>
                </Grid>
            </Card>
            <Typography component="h2" variant="h6" gutterBottom>
                出力信息
            </Typography>
            <Grid container spacing={2} columns={20} sx={{marginBottom: 3}}>
                <Grid size={{xs: 20, md: 20, lg: 20, xl: 12}}>
                    <Card variant="outlined" sx={{height: '100%', flexGrow: 1}}>
                        <CardContent>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                小型发电机
                            </Typography>
                            <CustomizedDataGrid rows={gen_rows} columns={gen_columns}/>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                最多可配置数：1
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs: 20, md: 20, lg: 20, xl: 8}}>
                    <Card variant="outlined" sx={{height: '100%', flexGrow: 1}}>
                        <CardContent>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                光伏发电
                            </Typography>
                            <CustomizedDataGrid rows={solar_rows} columns={solar_columns}/>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                最多可配置数：1
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs: 20, md: 20, lg: 20, xl: 10}}>
                    <Card variant="outlined" sx={{height: '100%', flexGrow: 1}}>
                        <CardContent>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                风力发电
                            </Typography>
                            <CustomizedDataGrid rows={wind_rows} columns={wind_columns}/>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                最多可配置数：1
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs: 20, md: 20, lg: 20, xl: 10}}>
                    <Card variant="outlined" sx={{height: '100%', flexGrow: 1}}>
                        <CardContent>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                储能电站
                            </Typography>
                            <CustomizedDataGrid rows={storage_rows} columns={storage_columns}/>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                最多可配置数：1
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Typography component="h2" variant="h6" gutterBottom>
                功率需求
            </Typography>
            <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        日耗电需求
                    </Typography>
                    <Stack sx={{justifyContent: 'space-between'}}>
                        <Typography variant="caption" sx={{color: 'text.secondary'}}>
                            时段数量为1（一天内）
                        </Typography>
                    </Stack>
                    <BarChart
                        borderRadius={8}
                        height={250}
                        xAxis={[{
                            scaleType: 'band', data: Array.from({length: 33}, (_, i) => `节点${i + 1}`)
                        }]}
                        yAxis={[{
                            label: '有功需求(kWh) / 无功需求(kvar)',
                        }]}
                        series={[
                            {
                                color: '#87CEFA',
                                data: [0, 100, 90, 120, 60, 60, 200, 200, 60, 60, 45, 60, 60, 120, 60, 60, 60, 90, 90, 90, 90, 90, 90, 420, 420, 60, 60, 60, 120, 200, 150, 210, 60]
                            },
                            {
                                color: 'purple',
                                data: [0, 60, 40, 80, 30, 20, 100, 100, 20, 20, 30, 35, 35, 80, 10, 20, 20, 40, 40, 40, 40, 40, 50, 200, 200, 25, 25, 20, 70, 600, 70, 100, 40]
                            }
                        ]}
                        margin={{left: 50, right: 0, top: 20, bottom: 20}}
                        grid={{horizontal: true}}
                        slotProps={{
                            legend: {
                                hidden: true,
                            },
                        }}
                        sx={{
                            [`.${axisClasses.left} .${axisClasses.label}`]: {
                                transform: 'translate(-10px, 0)',
                            },
                        }}
                    />
                </CardContent>
            </Card>
            <Typography component="h2" variant="h6" gutterBottom>
                电价数据
            </Typography>
            <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                时段设置为1，整合电价为0.663元/kWh。
            </Card>
            <Typography component="h2" variant="h6" gutterBottom>
                辐照度和风力信息
            </Typography>
            <Grid container spacing={2} columns={12} sx={{marginBottom: 3}}>
                <Grid size={{xs: 20, md: 6}}>
                    <Card variant="outlined" sx={{width: '100%'}}>
                        时段设置为1，整合辐照度为0.4。
                    </Card>
                </Grid>
                <Grid size={{xs: 20, md: 6}}>
                    <Card variant="outlined" sx={{width: '100%'}}>
                        时段设置为1，整合风力为0.5。
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}