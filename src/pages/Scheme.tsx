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
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {transformBackendToFrontend} from '../data/transformBackend';
import ErrorRetryPanel from '../components/ErrorRetryPanel';
import CircularProgress from '@mui/material/CircularProgress';

import {colDefs} from '../data/data_col_def';
import {useLocation} from 'react-router-dom';

const Scheme: React.FC = () => {

    const [powerBusNum, setPowerBusNum] = React.useState(1);
    const [chargingBusNum, setChargingBusNum] = React.useState(1);

    // 状态：加载、错误、后端数据
    const [loading, setLoading] = React.useState<boolean>(false);
    const [backendData, setBackendData] = React.useState<any>(null);
    const [errorPayload, setErrorPayload] = React.useState<any>(null);

    // 读取后端地址（来自 vite 环境变量 VITE_BACKEND_URL）。若未配置，回退到 localhost:5000，方便开发测试。
    const backendUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL) ? String(import.meta.env.VITE_BACKEND_URL).replace(/\/$/, '') : 'http://127.0.0.1:5000';

    const location = useLocation();
    const defaultName = React.useMemo(() => {
        const p = (location && location.pathname) ? String(location.pathname) : '';
        const seg = p.split('/').filter(Boolean).pop();
        return seg ?? null;
    }, [location.pathname]);

    // 尝试从后端加载指定文件的 JSON。后端路由：GET /data/path:<name>
    const fetchData = React.useCallback(async (name: string | null) => {
        if (!name) return;
        // 规范 name：取 basename（去掉路径）并去掉扩展名，符合后端 secure_filename->basename 行为
        const raw = String(name);
        const baseOnly = raw.split(/[\\/]/).pop() ?? raw; // 去掉路径部分
        const baseName = baseOnly.replace(/\.[^.]+$/, ''); // 去掉扩展名

        setLoading(true);
        setErrorPayload(null);

        // 后端仅提供 /data/filename 路由，使用 basename 构造 /data/<baseName>
        let lastError: any = null;
        const p = `/data/${encodeURIComponent(baseName)}`;
        try {
            const url = backendUrl + p;
            const res = await fetch(url, {method: 'GET'});
            if (!res.ok) {
                lastError = `HTTP ${res.status} ${res.statusText} when requesting ${p}`;
            } else {
                const json = await res.json();
                // 后端返回格式可能为 { success: true, data: {...} } 或 { success:false, message: '...' }
                if (json && typeof json === 'object' && 'success' in json) {
                    if (!json.success) {
                        lastError = json.message || `后端返回 success=false for ${p}`;
                    } else {
                        const payload = json.data ?? json;
                        const transformed = transformBackendToFrontend(payload);
                        setBackendData(transformed);
                        setLoading(false);
                        setErrorPayload(null);
                        return;
                    }
                } else {
                    const transformed = transformBackendToFrontend(json);
                    setBackendData(transformed);
                    setLoading(false);
                    setErrorPayload(null);
                    return;
                }
            }
        } catch (err: any) {
            lastError = err;
        }

        const detail = typeof lastError === 'string' ? lastError : (lastError && lastError.message) ? lastError.message : '无法从后端加载指定文件';
        setErrorPayload({message: '后端数据加载失败', detail});
        setBackendData(null);
        setLoading(false);
    }, [backendUrl]);

    // 直接使用后端数据（忽略父组件传入的 data）
    const data = backendData ?? null;

    // 从列定义导入列（列定义已在 data_col_def 文件中声明）
    const {
        bus_columns,
        branch_columns,
        gen_columns,
        pv_columns,
        wind_columns,
        ess_columns
    } = colDefs;

    // 统一重试函数：优先使用路由中的 defaultName，否则请求 /plans 并加载第一个方案
    const handleRetry = React.useCallback(async () => {
        setErrorPayload(null);
        if (defaultName) {
            await fetchData(defaultName);
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(backendUrl + '/plans');
            if (!res.ok) {
                const text = await res.text().catch(() => '');
                const detail = `HTTP ${res.status} ${res.statusText} ${text}`;
                setErrorPayload({message: '后端方案列表加载失败', detail});
                setLoading(false);
                return;
            }
            const j = await res.json();
            let plans: any[] = [];
            if (j && typeof j === 'object' && 'success' in j && Array.isArray(j.plans)) plans = j.plans;
            else if (Array.isArray(j)) plans = j;
            else if (j && Array.isArray(j?.data)) plans = j.data;
            if (plans.length === 0) {
                setErrorPayload({message: '后端未返回任何方案'});
                setLoading(false);
                return;
            }
            const first = plans[0];
            const id = typeof first === 'string' ? first : (first.filename ?? first.name ?? first);
            await fetchData(String(id));
        } catch (err: any) {
            setErrorPayload({message: '后端方案列表加载失败', detail: String(err)});
            setLoading(false);
        }
    }, [backendUrl, defaultName, fetchData]);

    // 页面挂载时自动尝试加载数据（优先路由名，否则尝试 /plans）
    React.useEffect(() => {
        let mounted = true;
        (async () => {
            if (!mounted) return;
            await handleRetry();
        })();
        return () => {
            mounted = false;
        };
    }, [handleRetry]);

    // 当加载中显示简单提示（在此组件不替换布局，仅不阻塞渲染）
    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
                <CircularProgress/>
            </Box>
        );
    }

    // 如果没有数据，显示错误信息（只保留错误信息与重试），并允许打开详细对话框
    if (!data) {
        // 如果正在加载则显示加载指示
        if (loading) {
            return (
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
                    <CircularProgress/>
                </Box>
            );
        }
        return (
            <Box sx={{p: 2}}>
                <ErrorRetryPanel
                    message={errorPayload && ('后端加载数据失败：' + errorPayload.detail) || '没有可用的数据。'}
                    onRetry={() => handleRetry()}/>
            </Box>
        );
    } else {
        const bus_rows = data.bus_rows ?? data.bus ?? [];
        const branch_rows = data.branch_rows ?? data.branch ?? [];
        const gen_rows = data.gen_rows ?? data.gen ?? [];
        const pv_rows = data.pv_rows ?? data.solar_rows ?? data.pv ?? data.solar ?? [];
        const wind_rows = data.wind_rows ?? data.wind ?? [];
        const ess_rows = data.ess_rows ?? data.storage_rows ?? data.ess ?? data.storage ?? [];

        const network_name = data.network_name ?? data.name ?? 'NETWORK';
        const gen_num = data.gen_num ?? (Array.isArray(gen_rows) ? gen_rows.length : 0);
        const solar_num = data.solar_num ?? (Array.isArray(pv_rows) ? pv_rows.length : 0);
        const wind_num = data.wind_num ?? (Array.isArray(wind_rows) ? wind_rows.length : 0);
        const ess_num = data.storage_num ?? data.ess_num ?? (Array.isArray(ess_rows) ? ess_rows.length : 0);

        const price = data.price ?? [];
        const solar_irradiance = data.solar_irradiance ?? [];
        const wind_speed = data.wind_speed ?? [];
        const pd = data.pd ?? [];
        const ev_demand = data.ev_demand ?? data.ev ?? Array.from({length: 24}, () => 0);

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
                    <Grid size={{xs: 20, md: 20, lg: 20, xl: 10}}>
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
                    <Grid size={{xs: 20, md: 20, lg: 20, xl: 10}}>
                        <Card variant="outlined" sx={{height: '100%', flexGrow: 1}}>
                            <CardContent>
                                <Typography component="h1" variant="subtitle1" gutterBottom>
                                    光伏发电
                                </Typography>
                                <DataGrid rows={pv_rows} columns={pv_columns}/>
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
                                <DataGrid rows={ess_rows} columns={ess_columns}/>
                                <Typography component="h1" variant="subtitle1" gutterBottom>
                                    最多可配置数：{ess_num}
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
                                *时段数设置为 24（一天内）
                            </Typography>
                        </Stack>
                        <Box sx={{display: 'flex', marginTop: 1, marginBottom: -2}}>
                            <Typography variant="body1" sx={{marginTop: 1}}>
                                选择节点：
                            </Typography>
                            <Select
                                value={String(powerBusNum)}
                                onChange={(e: SelectChangeEvent) => setPowerBusNum(Number(e.target.value))}
                                labelId="bus-select-label"
                                id="bus-select"
                            >
                                {Array.from({length: 33}, (_, i) => (
                                    <MenuItem key={i + 1} value={(i + 1)}>
                                        节点{i + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <LineChart data={pd[powerBusNum - 1]} xLabel={'时段'} yLabel={'功率 (kW)'}
                                   sLabel={'功率'}/>
                    </CardContent>
                </Card>
                <Typography component="h2" variant="h6" gutterBottom>
                    充电需求
                </Typography>
                <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                    <CardContent>
                        <Stack sx={{justifyContent: 'space-between'}}>
                            <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                *时段数量为 24（一天内）
                            </Typography>
                        </Stack>
                        <Box sx={{display: 'flex', marginTop: 1, marginBottom: -2}}>
                            <Typography variant="body1" sx={{marginTop: 1}}>
                                选择节点：
                            </Typography>
                            <Select
                                value={String(chargingBusNum)}
                                onChange={(e: SelectChangeEvent) => setChargingBusNum(Number(e.target.value))}
                                labelId="ev-select-label"
                                id="ev-select"
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
                                    color: 'rgba(0,140,140,0.86)',
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
                    <LineChart data={price} xLabel={'时段'} yLabel={'电价 (元/kWh)'} sLabel={'电价'}/>
                </Card>
                <Typography component="h2" variant="h6" gutterBottom>
                    辐照度和风力信息
                </Typography>
                <Grid container spacing={2} columns={12} sx={{marginBottom: 3}}>
                    <Grid size={{xs: 20, md: 6}}>
                        <Card variant="outlined" sx={{width: '100%'}}>
                            *时段设置为 24 。
                            <LineChart data={solar_irradiance} xLabel={'时段'} yLabel={'辐照度 (W/m²)'}
                                       sLabel={'辐照度'}/>
                        </Card>
                    </Grid>
                    <Grid size={{xs: 20, md: 6}}>
                        <Card variant="outlined" sx={{width: '100%'}}>
                            *时段设置为 24 。
                            <LineChart data={wind_speed} xLabel={'时段'} yLabel={'风力 (m/s)'} sLabel={'风力'}/>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default Scheme;
