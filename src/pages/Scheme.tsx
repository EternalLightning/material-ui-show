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
import CircularProgress from '@mui/material/CircularProgress';
import {buildBackendUrl, getBackendUrl} from '../config/api';
import AlertDialog from '../components/AlertDialog';
import Button from '@mui/material/Button';
import {colDefs} from '../data/data_col_def';
import {useLocation} from 'react-router-dom';

const Scheme: React.FC = () => {

    const [powerBusNum, setPowerBusNum] = React.useState(1);
    const [chargingBusNum, setChargingBusNum] = React.useState(1);

    // 状态：加载、错误、后端数据
    const [loading, setLoading] = React.useState<boolean>(false);
    const [backendData, setBackendData] = React.useState<any>(null);
    const [retrying, setRetrying] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState<string>('');

    // 读取后端地址（来自 vite 环境变量 VITE_BACKEND_URL）。若未配置，回退到 localhost:5000，方便开发测试。
    const backendUrl = getBackendUrl();

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
        setRetrying(true);
        setAlertMessage('');

        // 后端仅提供 /data/filename 路由，使用 basename 构造 /data/<baseName>
        let lastError: any = null;
        const p = `/data/${encodeURIComponent(baseName)}`;
        try {
            const url = buildBackendUrl(p);
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
                        setAlertMessage('');
                        setRetrying(false);
                        return;
                    }
                } else {
                    const transformed = transformBackendToFrontend(json);
                    setBackendData(transformed);
                    setLoading(false);
                    setAlertMessage('');
                    setRetrying(false);
                    return;
                }
            }
        } catch (err: any) {
            lastError = err;
        }

        const detail = typeof lastError === 'string' ? lastError : (lastError && lastError.message) ? lastError.message : '无法从后端加载指定文件';
        setAlertMessage(detail);
        setAlertOpen(true);
        setBackendData(null);
        setLoading(false);
        setRetrying(false);
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
        setAlertMessage('');
        if (defaultName) {
            await fetchData(defaultName);
            return;
        }
        try {
            setLoading(true);
            setRetrying(true);
            const res = await fetch(buildBackendUrl('/plans'));
            if (!res.ok) {
                const text = await res.text().catch(() => '');
                const detail = `HTTP ${res.status} ${res.statusText} ${text}`;
                setAlertMessage(detail);
                setAlertOpen(true);
                setLoading(false);
                setRetrying(false);
                return;
            }
            const j = await res.json();
            let plans: any[] = [];
            if (j && typeof j === 'object' && 'success' in j && Array.isArray(j.plans)) plans = j.plans;
            else if (Array.isArray(j)) plans = j;
            else if (j && Array.isArray(j?.data)) plans = j.data;
            if (plans.length === 0) {
                const msg = '后端未返回任何方案';
                setAlertMessage(msg);
                setAlertOpen(true);
                setLoading(false);
                setRetrying(false);
                return;
            }
            const first = plans[0];
            const id = typeof first === 'string' ? first : (first.filename ?? first.name ?? first);
            await fetchData(String(id));
            setRetrying(false);
            setLoading(false);
            return;
        } catch (err: any) {
            const detail = String(err);
            setAlertMessage(detail);
            setAlertOpen(true);
            setLoading(false);
            setRetrying(false);
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
    if (loading && !backendData) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
                <CircularProgress/>
            </Box>
        );
    }

    const content = data ? (
        <>
            <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1900px'}}}>
                <Box display="flex" alignItems="center" justifyContent="space-between" sx={{mb: 2}}>
                    <Typography component="h2" variant="h6">
                        方案详细信息
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Button variant="contained" color="error" onClick={handleRetry} disabled={retrying}>
                            重试
                        </Button>
                        {retrying && <CircularProgress size={20}/>}
                    </Box>
                </Box>
                <Card variant="outlined" sx={{marginBottom: 3}}>
                    <Typography component="h1" variant="subtitle1" gutterBottom>
                        拓扑信息
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        网络名称：{data.network_name ?? data.name ?? 'NETWORK'}
                    </Typography>
                    <Grid container spacing={2} columns={12}>
                        <Grid size={{xs: 12, md: 12, lg: 12, xl: 6}}>
                            <DataGrid rows={data.bus_rows ?? data.bus ?? []} columns={bus_columns}/>
                        </Grid>
                        <Grid size={{xs: 12, md: 12, lg: 12, xl: 6}}>
                            <DataGrid rows={data.branch_rows ?? data.branch ?? []} columns={branch_columns}/>
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
                                <DataGrid rows={data.gen_rows ?? data.gen ?? []} columns={gen_columns}/>
                                <Typography component="h1" variant="subtitle1" gutterBottom>
                                    最多可配置数：{data.gen_num ?? (Array.isArray(data.gen_rows) ? data.gen_rows.length : 0)}
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
                                <DataGrid rows={data.pv_rows ?? data.solar_rows ?? data.pv ?? data.solar ?? []}
                                          columns={pv_columns}/>
                                <Typography component="h1" variant="subtitle1" gutterBottom>
                                    最多可配置数：{data.solar_num ?? (Array.isArray(data.pv_rows) ? data.pv_rows.length : 0)}
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
                                <DataGrid rows={data.wind_rows ?? data.wind ?? []} columns={wind_columns}/>
                                <Typography component="h1" variant="subtitle1" gutterBottom>
                                    最多可配置数：{data.wind_num ?? (Array.isArray(data.wind_rows) ? data.wind_rows.length : 0)}
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
                                <DataGrid rows={data.ess_rows ?? data.storage_rows ?? data.ess ?? data.storage ?? []}
                                          columns={ess_columns}/>
                                <Typography component="h1" variant="subtitle1" gutterBottom>
                                    最多可配置数：{data.storage_num ?? data.ess_num ?? (Array.isArray(data.ess_rows) ? data.ess_rows.length : 0)}
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
                        <LineChart data={data.pd?.[powerBusNum - 1]} xLabel={'时段'} yLabel={'功率 (kW)'}
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
                                    data: data.ev_demand ?? data.ev ?? Array.from({length: 24}, () => 0),
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
                    <LineChart data={data.price} xLabel={'时段'} yLabel={'电价 (元/kWh)'} sLabel={'电价'}/>
                </Card>
                <Typography component="h2" variant="h6" gutterBottom>
                    辐照度和风力信息
                </Typography>
                <Grid container spacing={2} columns={12} sx={{marginBottom: 3}}>
                    <Grid size={{xs: 20, md: 6}}>
                        <Card variant="outlined" sx={{width: '100%'}}>
                            *时段设置为 24 。
                            <LineChart data={data.solar_irradiance} xLabel={'时段'} yLabel={'辐照度 (W/m²)'}
                                       sLabel={'辐照度'}/>
                        </Card>
                    </Grid>
                    <Grid size={{xs: 20, md: 6}}>
                        <Card variant="outlined" sx={{width: '100%'}}>
                            *时段设置为 24 。
                            <LineChart data={data.wind_speed} xLabel={'时段'} yLabel={'风力 (m/s)'} sLabel={'风力'}/>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    ) : (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1900px'}}}>
            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{mb: 2}}>
                <Typography component="h2" variant="h6">
                    方案详细信息
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <Button variant="contained" color="error" onClick={handleRetry} disabled={retrying}>
                        重试
                    </Button>
                    {retrying && <CircularProgress size={20}/>}
                </Box>
            </Box>
            <Card variant="outlined" sx={{p: 4}}>
                <Typography variant="body1" color="text.secondary">
                    当前没有可展示的方案数据，请点击右侧重试按钮重新获取。
                </Typography>
            </Card>
        </Box>
    );

    return (
        <>
            {content}
            <AlertDialog open={alertOpen} title="提示" content={alertMessage} onClose={() => {
                setAlertOpen(false);
                setRetrying(false);
            }}/>
        </>
    );
}

export default Scheme;
