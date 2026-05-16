import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

// ---------- 模拟数据 ----------

// 模拟节点选项
const FLEXIBLE_NODES = ['节点A-1', '节点A-2', '节点A-3', '节点B-1', '节点B-2'];
const PV_NODES = ['节点C-1', '节点C-2', '节点D-1', '节点D-2', '节点E-1'];
const EV_NODES = ['节点F-1', '节点F-2', '节点G-1', '节点G-2', '节点H-1'];

// 模拟表格数据：承载力提升值 0% ~ 50%
type MeasureItem = {
    measure: string;      // 改造措施描述
    expansionCost: number; // 扩容成本（万元）
    dailyCost: number;     // 日投资成本（万元）
    totalCost: number;     // 提升成本（万元）
};

type TableRowData = {
    capacityLevel: string;      // 承载力提升值
    sourceLoadCapacity: string; // 新型源荷容量
    measures: MeasureItem[];    // 改造措施列表
};

function generateMockTableData(): TableRowData[] {
    const levels = ['0%', '10%', '20%', '30%', '40%', '50%'];
    const sourceLoads = ['0 MW', '1.2 MW', '2.5 MW', '3.8 MW', '5.0 MW', '6.3 MW'];

    const measureSets: MeasureItem[][] = [
        // 0%
        [],
        // 10%
        [
            { measure: '线路7-8扩容0.5 MVA', expansionCost: 120, dailyCost: 0.4, totalCost: 120.4 },
        ],
        // 20%
        [
            { measure: '线路7-8扩容0.5 MVA', expansionCost: 120, dailyCost: 0.4, totalCost: 120.4 },
            { measure: '线路4-5扩容1.0 MVA', expansionCost: 200, dailyCost: 0.67, totalCost: 200.67 },
        ],
        // 30%
        [
            { measure: '线路7-8扩容1.0 MVA', expansionCost: 180, dailyCost: 0.6, totalCost: 180.6 },
            { measure: '线路4-5扩容1.0 MVA', expansionCost: 200, dailyCost: 0.67, totalCost: 200.67 },
            { measure: '新增变压器T2 2.0 MVA', expansionCost: 350, dailyCost: 1.17, totalCost: 351.17 },
        ],
        // 40%
        [
            { measure: '线路7-8扩容1.5 MVA', expansionCost: 250, dailyCost: 0.83, totalCost: 250.83 },
            { measure: '线路4-5扩容2.0 MVA', expansionCost: 320, dailyCost: 1.07, totalCost: 321.07 },
            { measure: '新增变压器T2 2.0 MVA', expansionCost: 350, dailyCost: 1.17, totalCost: 351.17 },
            { measure: '线路2-3扩容0.5 MVA', expansionCost: 100, dailyCost: 0.33, totalCost: 100.33 },
        ],
        // 50%
        [
            { measure: '线路7-8扩容2.0 MVA', expansionCost: 300, dailyCost: 1.0, totalCost: 301.0 },
            { measure: '线路4-5扩容2.0 MVA', expansionCost: 320, dailyCost: 1.07, totalCost: 321.07 },
            { measure: '新增变压器T2 3.0 MVA', expansionCost: 450, dailyCost: 1.5, totalCost: 451.5 },
            { measure: '线路2-3扩容1.0 MVA', expansionCost: 150, dailyCost: 0.5, totalCost: 150.5 },
            { measure: '新增储能装置5 MWh', expansionCost: 600, dailyCost: 2.0, totalCost: 602.0 },
        ],
    ];

    return levels.map((level, i) => ({
        capacityLevel: level,
        sourceLoadCapacity: sourceLoads[i],
        measures: measureSets[i],
    }));
}

// ---------- 主题颜色 ----------
const BG_DARK = '#0d1030';
const ACCENT_LINE = '#5584a2';
const PANEL_BG = '#131a40';
const CARD_BG = '#18204a';
const BUTTON_GRADIENT = 'linear-gradient(135deg, #4a3a8c 0%, #2a5c9a 100%)';
const TEXT_PRIMARY = '#e0e0e0';
const TEXT_SECONDARY = '#a0b5cc';

// ---------- 样式 ----------
const leftPanelSx = {
    width: 300,
    minWidth: 300,
    backgroundColor: PANEL_BG,
    borderRight: `1px solid ${ACCENT_LINE}40`,
    display: 'flex',
    flexDirection: 'column',
    p: 2.5,
    gap: 2,
    overflow: 'auto',
};

const categoryBtnSx = {
    width: '100%',
    justifyContent: 'flex-start',
    background: BUTTON_GRADIENT,
    color: TEXT_PRIMARY,
    fontWeight: 600,
    fontSize: '0.95rem',
    py: 1.2,
    px: 2,
    borderRadius: '10px',
    textTransform: 'none' as const,
    '&:hover': {
        background: 'linear-gradient(135deg, #5a4a9c 0%, #3a6caa 100%)',
    },
};

const formControlSx = {
    '& .MuiOutlinedInput-root': {
        color: TEXT_PRIMARY,
        '& fieldset': { borderColor: `${ACCENT_LINE}80` },
        '&:hover fieldset': { borderColor: ACCENT_LINE },
        '&.Mui-focused fieldset': { borderColor: ACCENT_LINE },
    },
    '& .MuiInputLabel-root': {
        color: TEXT_SECONDARY,
        '&.Mui-focused': { color: ACCENT_LINE },
    },
    '& .MuiSvgIcon-root': { color: TEXT_SECONDARY },
};

const computeBtnSx = {
    width: '100%',
    mt: 1,
    py: 1.5,
    background: 'linear-gradient(135deg, #1a6fb5 0%, #0d8a72 100%)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.1rem',
    borderRadius: '10px',
    textTransform: 'none' as const,
    '&:hover': {
        background: 'linear-gradient(135deg, #2080c5 0%, #109a82 100%)',
    },
    '&.Mui-disabled': {
        background: '#333',
        color: '#888',
    },
};

export default function CapacityAnalysis() {
    // 选中节点
    const [flexibleNode, setFlexibleNode] = React.useState<string>('');
    const [pvNode, setPvNode] = React.useState<string>('');
    const [evNode, setEvNode] = React.useState<string>('');

    // 计算状态
    const [computing, setComputing] = React.useState(false);
    const [hasResult, setHasResult] = React.useState(false);
    const [tableData, setTableData] = React.useState<TableRowData[]>([]);

    const handleFlexibleChange = (e: SelectChangeEvent<string>) => setFlexibleNode(e.target.value);
    const handlePvChange = (e: SelectChangeEvent<string>) => setPvNode(e.target.value);
    const handleEvChange = (e: SelectChangeEvent<string>) => setEvNode(e.target.value);

    const canCompute = flexibleNode !== '' && pvNode !== '' && evNode !== '';

    const handleCompute = () => {
        if (!canCompute) return;
        setComputing(true);
        setHasResult(false);

        // 模拟计算延迟
        setTimeout(() => {
            const data = generateMockTableData();
            setTableData(data);
            setHasResult(true);
            setComputing(false);
        }, 1500);
    };

    // 汇总统计
    const totalExpansionCost = tableData.reduce((sum, row) => {
        return sum + row.measures.reduce((s, m) => s + m.expansionCost, 0);
    }, 0);
    const totalDailyCost = tableData.reduce((sum, row) => {
        return sum + row.measures.reduce((s, m) => s + m.dailyCost, 0);
    }, 0);
    const totalEnhanceCost = tableData.reduce((sum, row) => {
        return sum + row.measures.reduce((s, m) => s + m.totalCost, 0);
    }, 0);

    // 计算最优承载力提升值
    const bestLevel = tableData.length > 0 ? tableData[tableData.length - 1].capacityLevel : '—';
    const bestSourceLoad = tableData.length > 0 ? tableData[tableData.length - 1].sourceLoadCapacity : '—';

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: BG_DARK,
                display: 'flex',
                overflow: 'hidden',
            }}
        >
            {/* ==================== 左侧操作面板 ==================== */}
            <Box sx={leftPanelSx}>
                {/* 分类标题 */}
                <Typography
                    sx={{
                        color: TEXT_PRIMARY,
                        fontWeight: 700,
                        fontSize: '1rem',
                        letterSpacing: 1,
                        mb: 0.5,
                        textAlign: 'center',
                        pb: 1,
                        borderBottom: `1px solid ${ACCENT_LINE}60`,
                    }}
                >
                    参数分类
                </Typography>

                {/* 分类按钮 */}
                <Button sx={categoryBtnSx}>电动汽车负荷特性</Button>
                <Button sx={categoryBtnSx}>新能源输出特性</Button>
                <Button sx={categoryBtnSx}>常规负荷特性</Button>
                <Button sx={categoryBtnSx}>设备经济测算系数</Button>
                <Button sx={categoryBtnSx}>电费</Button>

                <Divider sx={{ borderColor: `${ACCENT_LINE}40`, my: 1 }} />

                {/* 监测参数标题 */}
                <Typography
                    sx={{
                        color: TEXT_PRIMARY,
                        fontWeight: 700,
                        fontSize: '1rem',
                        letterSpacing: 1,
                        mb: 0.5,
                        textAlign: 'center',
                    }}
                >
                    监测参数
                </Typography>

                {/* 节点选择 */}
                <FormControl fullWidth size="small" sx={formControlSx}>
                    <InputLabel>柔性互联设备接入节点</InputLabel>
                    <Select
                        value={flexibleNode}
                        label="柔性互联设备接入节点"
                        onChange={handleFlexibleChange}
                        MenuProps={{
                            PaperProps: {
                                sx: { backgroundColor: PANEL_BG, color: TEXT_PRIMARY },
                            },
                        }}
                    >
                        {FLEXIBLE_NODES.map((n) => (
                            <MenuItem key={n} value={n}>{n}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={formControlSx}>
                    <InputLabel>光伏接入节点</InputLabel>
                    <Select
                        value={pvNode}
                        label="光伏接入节点"
                        onChange={handlePvChange}
                        MenuProps={{
                            PaperProps: {
                                sx: { backgroundColor: PANEL_BG, color: TEXT_PRIMARY },
                            },
                        }}
                    >
                        {PV_NODES.map((n) => (
                            <MenuItem key={n} value={n}>{n}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={formControlSx}>
                    <InputLabel>EV充电站接入节点</InputLabel>
                    <Select
                        value={evNode}
                        label="EV充电站接入节点"
                        onChange={handleEvChange}
                        MenuProps={{
                            PaperProps: {
                                sx: { backgroundColor: PANEL_BG, color: TEXT_PRIMARY },
                            },
                        }}
                    >
                        {EV_NODES.map((n) => (
                            <MenuItem key={n} value={n}>{n}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* 计算分析按钮 */}
                <Button
                    sx={computeBtnSx}
                    disabled={!canCompute || computing}
                    onClick={handleCompute}
                >
                    {computing ? (
                        <CircularProgress size={24} sx={{ color: '#fff', mr: 1 }} />
                    ) : null}
                    计算分析
                </Button>
            </Box>

            {/* ==================== 右侧结果区域 ==================== */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    gap: 2.5,
                    overflow: 'auto',
                    backgroundColor: BG_DARK,
                }}
            >
                {/* 页面标题 + 操作按钮 */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        sx={{
                            color: TEXT_PRIMARY,
                            fontWeight: 700,
                            fontSize: '1.4rem',
                            letterSpacing: 1,
                        }}
                    >
                        承载力提升规划分析
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button
                            sx={{
                                color: TEXT_PRIMARY,
                                borderColor: `${ACCENT_LINE}80`,
                                textTransform: 'none',
                                '&:hover': { borderColor: ACCENT_LINE, backgroundColor: `${ACCENT_LINE}20` },
                            }}
                            variant="outlined"
                            size="small"
                        >
                            重置默认
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: ACCENT_LINE,
                                color: '#fff',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': { backgroundColor: '#6a9ab8' },
                            }}
                            variant="contained"
                            size="small"
                        >
                            保存设置
                        </Button>
                    </Box>
                </Box>

                {/* 无结果时的提示 */}
                {!hasResult && !computing && (
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Typography sx={{ color: TEXT_SECONDARY, fontSize: '1.1rem' }}>
                            请在左侧选择接入节点，然后点击"计算分析"按钮
                        </Typography>
                        <Typography sx={{ color: `${TEXT_SECONDARY}80`, fontSize: '0.9rem' }}>
                            系统将自动计算承载力提升方案、改造措施及成本分析
                        </Typography>
                    </Box>
                )}

                {/* 加载中 */}
                {computing && (
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <CircularProgress size={48} sx={{ color: ACCENT_LINE }} />
                        <Typography sx={{ color: TEXT_SECONDARY }}>
                            正在计算分析中，请稍候...
                        </Typography>
                    </Box>
                )}

                {/* 结果展示 */}
                {hasResult && !computing && (
                    <>
                        {/* ===== 承载力提升结果分析 ===== */}
                        <Typography
                            sx={{
                                color: ACCENT_LINE,
                                fontWeight: 700,
                                fontSize: '1.15rem',
                                borderBottom: `2px solid ${ACCENT_LINE}60`,
                                pb: 0.5,
                            }}
                        >
                            承载力提升结果分析
                        </Typography>

                        {/* 三列结果卡片 */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {/* 提升结果 */}
                            <Paper
                                sx={{
                                    flex: 1,
                                    backgroundColor: CARD_BG,
                                    border: `1px solid ${ACCENT_LINE}40`,
                                    borderRadius: 2,
                                    p: 2.5,
                                }}
                            >
                                <Typography sx={{ color: ACCENT_LINE, fontWeight: 700, mb: 1.5, fontSize: '0.95rem' }}>
                                    📈 提升结果
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: TEXT_SECONDARY }}>最优承载力提升值：</Typography>
                                        <Typography sx={{ color: '#4caf50', fontWeight: 700 }}>{bestLevel}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: TEXT_SECONDARY }}>新型源荷容量：</Typography>
                                        <Typography sx={{ color: TEXT_PRIMARY, fontWeight: 600 }}>{bestSourceLoad}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: TEXT_SECONDARY }}>接入节点方案：</Typography>
                                        <Typography sx={{ color: TEXT_PRIMARY }}>
                                            {flexibleNode} / {pvNode} / {evNode}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>

                            {/* 改造措施 */}
                            <Paper
                                sx={{
                                    flex: 1,
                                    backgroundColor: CARD_BG,
                                    border: `1px solid ${ACCENT_LINE}40`,
                                    borderRadius: 2,
                                    p: 2.5,
                                }}
                            >
                                <Typography sx={{ color: ACCENT_LINE, fontWeight: 700, mb: 1.5, fontSize: '0.95rem' }}>
                                    🔧 改造措施
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                                    {tableData.length > 0 &&
                                        tableData[tableData.length - 1].measures.map((m, i) => (
                                            <Typography key={i} sx={{ color: TEXT_PRIMARY, fontSize: '0.85rem' }}>
                                                {i + 1}. {m.measure}
                                            </Typography>
                                        ))}
                                    {tableData.length > 0 && tableData[tableData.length - 1].measures.length === 0 && (
                                        <Typography sx={{ color: TEXT_SECONDARY }}>无需改造</Typography>
                                    )}
                                </Box>
                            </Paper>

                            {/* 改造成本 */}
                            <Paper
                                sx={{
                                    flex: 1,
                                    backgroundColor: CARD_BG,
                                    border: `1px solid ${ACCENT_LINE}40`,
                                    borderRadius: 2,
                                    p: 2.5,
                                }}
                            >
                                <Typography sx={{ color: ACCENT_LINE, fontWeight: 700, mb: 1.5, fontSize: '0.95rem' }}>
                                    💰 改造成本
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: TEXT_SECONDARY }}>扩容总成本：</Typography>
                                        <Typography sx={{ color: '#ff9800', fontWeight: 700 }}>
                                            {totalExpansionCost.toFixed(1)} 万元
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: TEXT_SECONDARY }}>日投资成本：</Typography>
                                        <Typography sx={{ color: TEXT_PRIMARY, fontWeight: 600 }}>
                                            {totalDailyCost.toFixed(2)} 万元/日
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ color: TEXT_SECONDARY }}>综合提升成本：</Typography>
                                        <Typography sx={{ color: '#e91e63', fontWeight: 700 }}>
                                            {totalEnhanceCost.toFixed(1)} 万元
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                        {/* ===== 详细分析表格 ===== */}
                        <Typography
                            sx={{
                                color: ACCENT_LINE,
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                mt: 1,
                            }}
                        >
                            承载力提升详细分析表
                        </Typography>

                        <TableContainer
                            component={Paper}
                            sx={{
                                backgroundColor: CARD_BG,
                                border: `1px solid ${ACCENT_LINE}40`,
                                borderRadius: 2,
                                maxHeight: 420,
                            }}
                        >
                            <Table size="small" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                backgroundColor: '#1a2560',
                                                color: ACCENT_LINE,
                                                fontWeight: 700,
                                                borderBottom: `2px solid ${ACCENT_LINE}`,
                                                minWidth: 120,
                                            }}
                                        >
                                            承载力提升值
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                backgroundColor: '#1a2560',
                                                color: ACCENT_LINE,
                                                fontWeight: 700,
                                                borderBottom: `2px solid ${ACCENT_LINE}`,
                                                minWidth: 120,
                                            }}
                                        >
                                            新型源荷容量
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                backgroundColor: '#1a2560',
                                                color: ACCENT_LINE,
                                                fontWeight: 700,
                                                borderBottom: `2px solid ${ACCENT_LINE}`,
                                                minWidth: 280,
                                            }}
                                        >
                                            改造措施
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                backgroundColor: '#1a2560',
                                                color: ACCENT_LINE,
                                                fontWeight: 700,
                                                borderBottom: `2px solid ${ACCENT_LINE}`,
                                                minWidth: 280,
                                            }}
                                        >
                                            提升的成本
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row, rowIdx) => {
                                        const measureCount = row.measures.length;
                                        return row.measures.length === 0 ? (
                                            // 无改造措施的行（单行）
                                            <TableRow
                                                key={rowIdx}
                                                sx={{
                                                    '&:nth-of-type(odd)': { backgroundColor: '#0f1840' },
                                                    '&:nth-of-type(even)': { backgroundColor: '#111d4a' },
                                                }}
                                            >
                                                <TableCell sx={{ color: TEXT_PRIMARY, borderColor: `${ACCENT_LINE}20` }}>
                                                    {row.capacityLevel}
                                                </TableCell>
                                                <TableCell sx={{ color: TEXT_PRIMARY, borderColor: `${ACCENT_LINE}20` }}>
                                                    {row.sourceLoadCapacity}
                                                </TableCell>
                                                <TableCell sx={{ color: TEXT_SECONDARY, borderColor: `${ACCENT_LINE}20` }}>
                                                    无需改造
                                                </TableCell>
                                                <TableCell sx={{ color: TEXT_SECONDARY, borderColor: `${ACCENT_LINE}20` }}>
                                                    —
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            row.measures.map((measure, mIdx) => (
                                                <TableRow
                                                    key={`${rowIdx}-${mIdx}`}
                                                    sx={{
                                                        '&:nth-of-type(odd)': { backgroundColor: '#0f1840' },
                                                        '&:nth-of-type(even)': { backgroundColor: '#111d4a' },
                                                    }}
                                                >
                                                    {mIdx === 0 && (
                                                        <>
                                                            <TableCell
                                                                rowSpan={measureCount}
                                                                sx={{
                                                                    color: '#4caf50',
                                                                    fontWeight: 700,
                                                                    borderColor: `${ACCENT_LINE}20`,
                                                                    verticalAlign: 'top',
                                                                }}
                                                            >
                                                                {row.capacityLevel}
                                                            </TableCell>
                                                            <TableCell
                                                                rowSpan={measureCount}
                                                                sx={{
                                                                    color: TEXT_PRIMARY,
                                                                    fontWeight: 600,
                                                                    borderColor: `${ACCENT_LINE}20`,
                                                                    verticalAlign: 'top',
                                                                }}
                                                            >
                                                                {row.sourceLoadCapacity}
                                                            </TableCell>
                                                        </>
                                                    )}
                                                    <TableCell
                                                        sx={{
                                                            color: TEXT_PRIMARY,
                                                            borderColor: `${ACCENT_LINE}20`,
                                                            fontSize: '0.85rem',
                                                        }}
                                                    >
                                                        {measure.measure}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: TEXT_PRIMARY,
                                                            borderColor: `${ACCENT_LINE}20`,
                                                            fontSize: '0.82rem',
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                                                            <Typography component="span" sx={{ color: '#ff9800', fontSize: '0.8rem' }}>
                                                                扩容成本：{measure.expansionCost.toFixed(1)} 万元
                                                            </Typography>
                                                            <Typography component="span" sx={{ color: TEXT_SECONDARY, fontSize: '0.78rem' }}>
                                                                日投资成本：{measure.dailyCost.toFixed(2)} 万元/日
                                                            </Typography>
                                                            <Typography component="span" sx={{ color: '#e91e63', fontSize: '0.8rem', fontWeight: 600 }}>
                                                                提升成本：{measure.totalCost.toFixed(1)} 万元
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Box>
        </Box>
    );
}
