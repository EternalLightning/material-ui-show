import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import {Box, InputLabel} from "@mui/material";
import Card from "@mui/material/Card";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import AlertDialog from '../components/AlertDialog';
import ErrorRetryPanel from '../components/ErrorRetryPanel';

export default function SystemConfig() {
    // 配置状态与加载/保存状态
    const [loading, setLoading] = React.useState<boolean>(true);
    const [saving, setSaving] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = React.useState<string | null>(null);

    // config state（根据接口返回示例）
    const [baseS, setBaseS] = React.useState<number | ''>('');
    const [baseU, setBaseU] = React.useState<number | ''>('');
    const [solverName, setSolverName] = React.useState<string>('cplex');
    const [solverMaxTime, setSolverMaxTime] = React.useState<number | ''>('');
    const [solverGapTol, setSolverGapTol] = React.useState<number | ''>('');
    const [solverVerbose, setSolverVerbose] = React.useState<number | ''>('');
    const [timePeriods, setTimePeriods] = React.useState<number | ''>('');
    const [outputSaveResults, setOutputSaveResults] = React.useState<boolean>(false);
    const [outputPath, setOutputPath] = React.useState<string>('');

    // alert dialog
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState<string | undefined>(undefined);
    const [alertContent, setAlertContent] = React.useState<React.ReactNode | undefined>(undefined);

    const loadConfig = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://127.0.0.1:5000/config');
            let data: any = null;
            try {
                data = await res.json();
            } catch (e) { /* ignore */
            }

            if (!res.ok) {
                const msg = data?.message || `读取配置失败，状态码：${res.status}`;
                setError(msg);
                setLoading(false);
                return;
            }

            if (!data?.success || !data?.config) {
                setError('后端返回格式不正确');
                setLoading(false);
                return;
            }

            const cfg = data?.config ?? {};
            // 按示例结构解析并填充到表单状态（做存在性检查）
            setBaseS(cfg?.base?.S ?? '');
            setBaseU(cfg?.base?.U ?? '');
            setSolverName(cfg?.solver?.name ?? 'cplex');
            setSolverMaxTime(cfg?.solver?.max_time ?? '');
            setSolverGapTol(cfg?.solver?.gap_tol ?? '');
            setSolverVerbose(cfg?.solver?.verbose ?? '');
            setTimePeriods(cfg?.time ?? '');
            setOutputSaveResults(Boolean(cfg?.output?.save_results));
            setOutputPath(cfg?.output?.result_path ?? '');

            setLoading(false);
        } catch (e: any) {
            setError('读取配置失败：' + (e?.message || String(e)));
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        loadConfig();
    }, [loadConfig]);

    const handleSave = async () => {
        if (saving === 'loading') return;
        setSaving('loading');

        // 构建提交对象，仅包含需要写入的字段
        const body: any = {
            base: {S: Number(baseS), U: Number(baseU)},
            solver: {
                name: solverName,
                max_time: Number(solverMaxTime),
                gap_tol: Number(solverGapTol),
                verbose: Number(solverVerbose)
            },
            time: Number(timePeriods),
            output: {save_results: Boolean(outputSaveResults), result_path: outputPath}
        };

        try {
            const res = await fetch('http://127.0.0.1:5000/config', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            });

            let data: any = null;
            try {
                data = await res.json();
            } catch (e) {
            }

            if (!res.ok) {
                const msg = data?.message || `保存配置失败，状态码：${res.status}`;
                setSaving('error');
                setAlertTitle('错误');
                setAlertContent(msg);
                setAlertOpen(true);
            } else {
                if (data?.success) {
                    setSaving('success');
                    setAlertTitle('保存成功');
                    setAlertContent('配置已保存并重新加载');
                    setAlertOpen(true);
                    // 重新加载后端返回的 config
                    if (data?.config) {
                        const cfg = data?.config ?? {};
                        setBaseS(cfg?.base?.S ?? '');
                        setBaseU(cfg?.base?.U ?? '');
                        setSolverName(cfg?.solver?.name ?? 'cplex');
                        setSolverMaxTime(cfg?.solver?.max_time ?? '');
                        setSolverGapTol(cfg?.solver?.gap_tol ?? '');
                        setSolverVerbose(cfg?.solver?.verbose ?? '');
                        setTimePeriods(cfg?.time ?? '');
                        setOutputSaveResults(Boolean(cfg?.output?.save_results));
                        setOutputPath(cfg?.output?.result_path ?? '');
                    } else {
                        // 如果没有返回 config，则尝试重新 GET
                        await loadConfig();
                    }
                } else {
                    setSaving('error');
                    setAlertTitle('错误');
                    setAlertContent(data?.message || '保存未成功');
                    setAlertOpen(true);
                }
            }
        } catch (e: any) {
            setSaving('error');
            setAlertTitle('网络错误');
            setAlertContent('请求失败：' + (e?.message || String(e)));
            setAlertOpen(true);
        } finally {
            setTimeout(() => setSaving('idle'), 1500);
        }
    };

    return (
        <Box sx={{width: '80%', maxWidth: {sm: '100%', md: '1900px'}}}>
            <Typography variant="h6" gutterBottom>
                基准值设置
            </Typography>
            <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                <Grid container columns={8} spacing={2}>
                    <Grid size={{xs: 2}}>
                        <TextField
                            label="基准容量(MVA)"
                            id="base-capacity"
                            variant="standard"
                            type="number"
                            value={baseS}
                            onChange={(e) => setBaseS(e.target.value === '' ? '' : Number(e.target.value))}
                        />
                    </Grid>
                    <Grid size={{xs: 2}}>
                        <TextField
                            label="基准电压(kV)"
                            id="base-voltage"
                            variant="standard"
                            type="number"
                            value={baseU}
                            onChange={(e) => setBaseU(e.target.value === '' ? '' : Number(e.target.value))}
                        />
                    </Grid>
                    <Grid size={{xs: 2}}>
                        <TextField
                            label="时段数量"
                            id="time-periods"
                            variant="standard"
                            value={timePeriods}
                            onChange={(e) => setTimePeriods(e.target.value === '' ? '' : Number(e.target.value))}
                        />
                    </Grid>
                </Grid>
            </Card>

            <Typography variant="h6" gutterBottom>
                优化器设置
            </Typography>
            <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                <Grid container columns={8} spacing={2}>
                    <Grid size={{xs: 2}}>
                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                求解器
                            </InputLabel>
                            <Select
                                labelId="solver-select-label"
                                id="solver-select"
                                value={solverName}
                                onChange={(e) => setSolverName(String(e.target.value))}
                            >
                                <MenuItem value="cplex">CPLEX</MenuItem>
                                <MenuItem value="gurobi">Gurobi</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 2}} sx={{marginTop: 1.26, marginBottom: -1.26}}>
                        <TextField
                            label="最大求解时间（秒）"
                            id="max-solve-time"
                            variant="standard"
                            value={solverMaxTime}
                            onChange={(e) => setSolverMaxTime(e.target.value === '' ? '' : Number(e.target.value))}
                        />
                    </Grid>
                    <Grid size={{xs: 2}} sx={{marginTop: 1.26, marginBottom: -1.26}}>
                        <TextField
                            label="收敛容差"
                            id="convergence-tolerance"
                            variant="standard"
                            type="number"
                            value={solverGapTol}
                            onChange={(e) => setSolverGapTol(e.target.value === '' ? '' : Number(e.target.value))}
                        />
                    </Grid>
                    <Grid size={{xs: 2}}>
                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                求解细节显示
                            </InputLabel>
                            <Select
                                labelId="display-details-label"
                                id="display-details"
                                value={solverVerbose}
                                onChange={(e) => setSolverVerbose(Number(e.target.value))}
                            >
                                <MenuItem value={0}>不显示</MenuItem>
                                <MenuItem value={1}>少量</MenuItem>
                                <MenuItem value={2}>正常</MenuItem>
                                <MenuItem value={3}>详细</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Card>

            <Typography variant="h6" gutterBottom>
                结果输出设置
            </Typography>
            <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                <Grid container columns={8} spacing={2}>
                    <Grid size={{xs: 2}} sx={{marginTop: 1, marginBottom: -1}}>
                        <FormControlLabel
                            control={<Switch checked={outputSaveResults}
                                             onChange={(e) => setOutputSaveResults(e.target.checked)}/>}
                            label="保存结果到文件"
                        />
                    </Grid>
                    <Grid size={{xs: 2}}>
                        <TextField
                            label="结果保存路径"
                            id="result-save-path"
                            variant="standard"
                            value={outputPath}
                            onChange={(e) => setOutputPath(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Card>

            {/* 操作按钮行：左侧可放加载错误信息，右侧放 保存配置 按钮 */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    {loading && <Typography variant="body2">正在从后端加载配置... <CircularProgress size={14}
                                                                                                    sx={{ml: 1}}/></Typography>}
                    {error && <ErrorRetryPanel message={error} row onRetry={loadConfig}/>}
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        color={saving === 'success' ? 'success' : saving === 'error' ? 'error' : saving === 'idle' ? 'info' : 'inherit'}
                        onClick={handleSave}
                        sx={{minWidth: 120, transitionDuration: '0.2s'}}
                    >
                        {saving === 'loading' ? '保存中' : '保存配置'}
                        {saving === 'loading' && (<CircularProgress size={20} sx={{ml: 1}}/>)}
                    </Button>
                </Box>
            </Box>

            <AlertDialog open={alertOpen} title={alertTitle} content={alertContent}
                         onClose={() => setAlertOpen(false)}/>
        </Box>
    )
}

