import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import {CustomizedDataGrid as DataGrid, CustomizedLineChart as LineChart} from "../components/CustomizedDataComponents";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import {BarChart} from "@mui/x-charts/BarChart";
import {axisClasses} from '@mui/x-charts/ChartsAxis';
import {SchemeType} from '../../src/exportType'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Scheme: React.FC<SchemeType> = ({data}) => {
    const {
        bus_rows, bus_columns,
        branch_rows, branch_columns,
        gen_rows, gen_columns,
        solar_rows, solar_columns,
        wind_rows, wind_columns,
        storage_rows, storage_columns,
        network_name,
        gen_num, solar_num, wind_num, storage_num,
        price, solar_irradiance, wind_speed,
        pd = [], qd = [],
        ev_demand
    } = data;

    const [busNum, setBusNum] = React.useState(1);
    // @ts-ignore
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
                    网络名称：{network_name}
                </Typography>
                <Grid container spacing={2} columns={12}>
                    <Grid size={{xs: 12, md: 12, lg: 12, xl: 6}}>
                        <DataGrid rows={bus_rows} columns={bus_columns}/>
                    </Grid>
                    <Grid size={{xs: 12, md: 12, lg: 12, xl: 6}}>
                        <DataGrid rows={branch_rows} columns={branch_columns}/>
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
                            <DataGrid rows={gen_rows} columns={gen_columns}/>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                最多可配置数：{gen_num}
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
                            <DataGrid rows={solar_rows} columns={solar_columns}/>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                最多可配置数：{solar_num}
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
                            <DataGrid rows={wind_rows} columns={wind_columns}/>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                最多可配置数：{wind_num}
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
                            <DataGrid rows={storage_rows} columns={storage_columns}/>
                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                最多可配置数：{storage_num}
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
                        日基础负荷
                    </Typography>
                    <Stack sx={{justifyContent: 'space-between'}}>
                        <Typography variant="caption" sx={{color: 'text.secondary'}}>
                            时段数量为 24（一天内）
                        </Typography>
                    </Stack>
                    <Box sx={{display: 'flex', marginTop: 1, marginBottom: -2}}>
                        <Typography variant="body1" sx={{marginTop: 1}}>
                            选择节点：
                        </Typography>
                        <Select
                            onChange={(e) => setBusNum(parseInt(e.target.value))}
                            labelId="bus-select-label"
                            id="bus-select"
                            defaultValue={1}
                        >
                            {Array.from({length: 33}, (_, i) => (
                                <MenuItem key={i + 1} value={(i + 1)}>
                                    节点{i + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <LineChart data={pd[busNum - 1]} xLabel={'时段'} yLabel={'标幺值'} sLabel={'功率标幺值'}/>
                </CardContent>
            </Card>
            <Typography component="h2" variant="h6" gutterBottom>
                充电需求
            </Typography>
            <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                <CardContent>
                    <Stack sx={{justifyContent: 'space-between'}}>
                        <Typography variant="caption" sx={{color: 'text.secondary'}}>
                            时段数量为 24（一天内）
                        </Typography>
                    </Stack>
                    <Box sx={{display: 'flex', marginTop: 1, marginBottom: -2}}>
                        <Typography variant="body1" sx={{marginTop: 1}}>
                            选择节点：
                        </Typography>
                        <Select
                            onChange={(e) => setBusNum(parseInt(e.target.value))}
                            labelId="ev-select-label"
                            id="ev-select"
                            defaultValue={1}
                        >
                            {Array.from({length: 33}, (_, i) => (
                                <MenuItem key={i + 1} value={(i + 1)}>
                                    节点{i + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <BarChart
                        borderRadius={5}
                        height={450}
                        xAxis={[{
                            label: '时段',
                            scaleType: 'band',
                            data: Array.from({length: 24}, (_, i) => `${i + 1}`)
                        }]}
                        yAxis={[{
                            label: '电动汽车数量（辆）',
                        }]}
                        series={[
                            {
                                color: '#87CEFA',
                                label: '充电数量',
                                data: ev_demand,
                            },
                        ]}
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
                *时段设置为 24 。
                <LineChart data={price}/>
            </Card>
            <Typography component="h2" variant="h6" gutterBottom>
                辐照度和风力信息
            </Typography>
            <Grid container spacing={2} columns={12} sx={{marginBottom: 3}}>
                <Grid size={{xs: 20, md: 6}}>
                    <Card variant="outlined" sx={{width: '100%'}}>
                        *时段设置为 24 。
                        <LineChart data={solar_irradiance}/>
                    </Card>
                </Grid>
                <Grid size={{xs: 20, md: 6}}>
                    <Card variant="outlined" sx={{width: '100%'}}>
                        *时段设置为 24 。
                        <LineChart data={wind_speed}/>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Scheme;