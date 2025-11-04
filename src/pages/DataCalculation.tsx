import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CalculateIcon from '@mui/icons-material/Calculate';
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ErrorRetryPanel from '../components/ErrorRetryPanel';

function createData(
    head: string,
    wind: number,
    pv: number,
    ess: number,
    v2g: number,
    fastCharge: number,
) {
    return {head, wind, pv, ess, v2g, fastCharge};
}

const rows = [
    createData('容量 (MVA)', 100, 100, 100, 100, 100),
    createData('数量', 2, 2, 2, 2, 2),
];

export default function DataCalculation() {

    const [selectedCard, setSelectedCard] = React.useState(0);
    // 从后端获取的方案列表
    const [plans, setPlans] = React.useState<Array<{
        title: string;
        filename?: string | null;
        description?: React.ReactNode
    }> | null>(null);
    const [plansLoading, setPlansLoading] = React.useState<boolean>(true);
    const [plansError, setPlansError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(<></>);

    // 后端请求超时阈值
    const TIMEOUT_MS = 8000;

    const loadPlans = React.useCallback(async () => {
        setPlansLoading(true);
        setPlansError(null);
        setPlans(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const res = await fetch('http://127.0.0.1:5000/plans', {signal: controller.signal});
            clearTimeout(timeoutId);

            let data: any = null;
            try {
                data = await res.json();
            } catch (e) { /* ignore */
            }

            if (!res.ok) {
                const msg = data?.message || `获取方案失败，状态码：${res.status}`;
                setPlansError(msg);
                setPlansLoading(false);
                return;
            }

            if (!data?.success || !Array.isArray(data?.plans)) {
                setPlansError('后端返回格式不正确');
                setPlansLoading(false);
                return;
            }

            const remote = (data?.plans ?? []).map((p: any, idx: number) => {
                if (typeof p === 'string') return {title: p, filename: null, description: '无文件'};
                return {
                    title: p.name || `方案 ${idx + 1}`,
                    filename: p.filename ?? null,
                    description: p.filename ?? '无文件'
                };
            });

            setPlans(remote);
            setPlansLoading(false);
            setPlansError(null);
        } catch (e: any) {
            clearTimeout(timeoutId);
            if (e?.name === 'AbortError') setPlansError('请求超时，请重试');
            else setPlansError('获取方案列表失败：' + (e?.message || String(e)));
            setPlansLoading(false);
        }
    }, []);

    // 首次挂载加载 plans
    React.useEffect(() => {
        loadPlans();
    }, [loadPlans]);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (selectedCard === 0) {
                setMessage(
                    <>
                        <Typography component={'h2'} variant="h6" gutterBottom>
                            成本计算结果
                        </Typography>
                        <Card variant="outlined" sx={{marginBottom: 3, height: '100%', flexGrow: 1}}>
                            <Typography variant="body1" gutterBottom>
                                总运行成本为 10000 元，其中投资成本为 5000 元，运行成本为 5000 元。
                            </Typography>
                        </Card>
                        <Typography component={'h2'} variant="h6" gutterBottom>
                            优化配置结果
                        </Typography>
                        <Card variant="outlined" sx={{marginBottom: 3, height: '100%', flexGrow: 1}}>
                            <TableContainer component={Paper}>
                                <Table sx={{
                                    minWidth: 650,
                                    '& .MuiTableCell-root': {
                                        borderColor: 'rgb(209,206,206)', // 分割线为纯黑色
                                    }
                                }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell/>
                                            <TableCell align="center">风电</TableCell>
                                            <TableCell align="center">光伏</TableCell>
                                            <TableCell align="center">储能</TableCell>
                                            <TableCell align="center">V2G 桩</TableCell>
                                            <TableCell align="center">快充桩</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.head}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.head}
                                                </TableCell>
                                                <TableCell align="center">{row.wind}</TableCell>
                                                <TableCell align="center">{row.pv}</TableCell>
                                                <TableCell align="center">{row.ess}</TableCell>
                                                <TableCell align="center">{row.v2g}</TableCell>
                                                <TableCell align="center">{row.fastCharge}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </>
                );
            } else if (selectedCard === 1) {
                setMessage(
                    <Typography component={'h2'} variant="h6" gutterBottom>
                        计算结果
                    </Typography>
                );
            } else if (selectedCard === 2) {
                setMessage(
                    <Typography component={'h2'} variant="h6" gutterBottom>
                        计算结果
                    </Typography>
                );
            }
        }, 700);
    };

    return (
        <Box sx={{width: '80%', maxWidth: {sm: '100%', md: '1900px'}}}>
            <Typography component={'h2'} variant="h6" gutterBottom>
                选择方案
            </Typography>
            {/* plans 加载/错误处理 */}
            {plansLoading ? (
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120}}>
                    <CircularProgress/>
                </Box>
            ) : plansError ? (
                <Box sx={{p: 2}}>
                    <ErrorRetryPanel message={plansError} onRetry={() => loadPlans()}/>
                </Box>
            ) : (
                <Grid container spacing={2} columns={12}>
                    {plans?.map((card, index) => (
                        <Grid size={{xs: 12, md: 6, lg: 6, xl: 3}} key={card.title + index}>
                            <Card variant={'outlined'} sx={{width: '100%', borderRadius: 1, padding: 0}}>
                                <CardActionArea
                                    onClick={() => setSelectedCard(index)}
                                    data-active={selectedCard === index ? '' : undefined}
                                    sx={{
                                        height: '100%',
                                        '&[data-active]': {
                                            backgroundColor: 'rgba(0,0,0,0.08)',
                                            '&:hover': {backgroundColor: 'action.selectedHover'},
                                        },
                                    }}
                                >
                                    <CardContent sx={{height: '100%', margin: 2.5}}>
                                        <Typography variant="h5" component="h2" gutterBottom>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {card.description ?? (card.filename ?? '无文件')}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 5,
            }}>
                <Button
                    variant="contained"
                    color={'info'}
                    size={'large'}
                    startIcon={<CalculateIcon/>}
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? '计算中' : '开始计算'}
                    {loading && <CircularProgress size={20} sx={{ml: 1}}/>}
                </Button>
            </Box>
            {message && <p>{message}</p>}
        </Box>
    );
};