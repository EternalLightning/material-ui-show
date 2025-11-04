import * as React from "react";
import {useCallback, useEffect, useRef, useState} from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import AlertDialog from './AlertDialog';
import ErrorRetryPanel from './ErrorRetryPanel';


type RemoteCard = {
    title: string;
    filename?: string | null;
    description?: React.ReactNode;
};

const TIMEOUT_MS = 8000; // 请求超时阈值，毫秒

type SchemeCardsProps = {
    refreshKey?: number;
    // allowDelete 控制是否在卡片被选中时显示删除按钮（首页等场景可设为 false）
    allowDelete?: boolean;
}

const SchemeCards: React.FC<SchemeCardsProps> = ({refreshKey, allowDelete = true}) => {
    // cards === null 表示尚未成功获取；loading 控制是否显示加载中
    const [cards, setCards] = useState<RemoteCard[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // 被选中的卡片（点击后显示删除按钮），存储 title 与 filename
    const [selected, setSelected] = useState<{ title: string, filename?: string | null } | null>(null);
    // 删除中状态，防止重复点击
    const [deleting, setDeleting] = useState<boolean>(false);
    // 用于控制删除确认对话框
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [pendingDeleteCard, setPendingDeleteCard] = useState<RemoteCard | null>(null);
    // 容器 ref，用于检测点击是否发生在组件外部
    const containerRef = useRef<HTMLDivElement | null>(null);
    // 全局 alert 对话框状态（替代 alert）
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [alertDialogTitle, setAlertDialogTitle] = useState<string | undefined>(undefined);
    const [alertDialogContent, setAlertDialogContent] = useState<React.ReactNode | undefined>(undefined);

    const loadPlans = useCallback(async () => {
        setLoading(true);
        setError(null);
        setCards(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const res = await fetch('http://127.0.0.1:5000/plans', {signal: controller.signal});
            clearTimeout(timeoutId);

            let data: any = null;
            try {
                data = await res.json();
            } catch (e) { /* ignore JSON parse error */
            }

            if (!res.ok) {
                const msg = data?.message || `获取方案失败，状态码：${res.status}`;
                setError(msg);
                setLoading(false);
                return;
            }

            if (!data?.success || !Array.isArray(data?.plans)) {
                setError('后端返回格式不正确');
                setLoading(false);
                return;
            }

            const plans = data?.plans || [];
            const remote = plans.map((p: any, idx: number) => {
                if (typeof p === 'string') {
                    return {title: p, filename: null, description: '无文件'};
                }
                // 期望 p 为 { name: string, filename: string | null }
                return {
                    title: p.name || `方案 ${idx + 1}`,
                    filename: p.filename ?? null,
                    description: p.filename ?? '无文件'
                };
            });

            setCards(remote);
            setLoading(false);
            setError(null);
        } catch (e: any) {
            clearTimeout(timeoutId);
            if (e?.name === 'AbortError') {
                setError('请求超时，请重试');
            } else {
                setError('获取方案列表失败：' + (e?.message || String(e)));
            }
            setLoading(false);
        }
    }, []);

    // 首次挂载以及 refreshKey 变化时重新加载
    useEffect(() => {
        loadPlans();
    }, [loadPlans, refreshKey]);

    // 点击卡片切换选中状态
    const handleCardClick = (card: RemoteCard) => {
        if (selected && selected.title === card.title && selected.filename === card.filename) {
            setSelected(null);
        } else {
            setSelected({title: card.title, filename: card.filename});
        }
    };

    // 打开删除确认对话框（由删除按钮触发）
    const handleDeleteRequest = (card: RemoteCard) => {
        setPendingDeleteCard(card);
        setDeleteDialogOpen(true);
    };

    // 实际执行删除（在 Dialog 确认后调用）
    const performDelete = async () => {
        const card = pendingDeleteCard;
        if (!card) return;
        setDeleteDialogOpen(false);
        setDeleting(true);
        try {
            const body: any = {name: card.title};
            if (card.filename) body.filename = card.filename;

            const res = await fetch('http://127.0.0.1:5000/plans', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            });

            let data: any = null;
            try {
                data = await res.json();
            } catch (e) { /* ignore */
            }

            if (res.status === 404) {
                setAlertDialogTitle('提示');
                setAlertDialogContent(data?.message || '未找到匹配的方案');
                setAlertDialogOpen(true);
            } else if (!res.ok) {
                setAlertDialogTitle('错误');
                setAlertDialogContent(data?.message || `删除失败，状态码：${res.status}`);
                setAlertDialogOpen(true);
            } else {
                setAlertDialogTitle('已删除');
                setAlertDialogContent(data?.message || `已删除 ${data?.deleted ?? 0} 条`);
                setAlertDialogOpen(true);
                await loadPlans();
                try {
                    window.dispatchEvent(new Event('plans-updated'));
                } catch (e) { /* ignore */
                }
                setSelected(null);
            }
        } catch (e: any) {
            setAlertDialogTitle('错误');
            setAlertDialogContent('删除请求失败：' + (e?.message || String(e)));
            setAlertDialogOpen(true);
        } finally {
            setDeleting(false);
            setPendingDeleteCard(null);
        }
    };

    // 取消删除对话框
    const cancelDelete = () => {
        setDeleteDialogOpen(false);
        setPendingDeleteCard(null);
    };

    // 点击组件外部时取消选中（隐藏删除按钮）
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const target = e.target as Node;
            if (!containerRef.current.contains(target)) {
                setSelected(null);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{p: 2}}>
                <ErrorRetryPanel message={error} onRetry={() => loadPlans()}/>
            </Box>
        );
    }

    // cards 已成功加载
    return (
        <Box ref={containerRef}>
            <Grid container spacing={2} columns={12}>
                {cards?.map((card, index) => (
                    <Grid size={{xs: 12, md: 6, lg: 6, xl: 3}} key={card.title + index}>
                        <Card variant={'outlined'} sx={{
                            width: '100%',
                            borderRadius: 1,
                            padding: 0,
                            position: 'relative',
                        }}>
                            <CardActionArea onClick={() => handleCardClick(card)}>
                                <CardContent sx={{height: '100%', margin: 2.5}}>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.filename ?? '无文件'}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            {/* 选中时显示删除按钮，风格与页面其它按钮保持一致 */}
                            {allowDelete && selected && selected.title === card.title && selected.filename === card.filename && (
                                <Fade in={true} timeout={240}>
                                    <Box sx={{position: 'absolute', right: 12, bottom: 12}}>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteRequest(card);
                                            }}
                                            disabled={deleting}
                                        >
                                            删除方案
                                        </Button>
                                    </Box>
                                </Fade>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* 删除确认对话框 */}
            <Dialog open={deleteDialogOpen} onClose={cancelDelete} aria-labelledby="delete-dialog-title">
                <DialogTitle id="delete-dialog-title">确认删除方案</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {pendingDeleteCard ? `确定要删除方案 "${pendingDeleteCard.title}"${pendingDeleteCard.filename ? `，文件 ${pendingDeleteCard.filename}` : ''} 吗？此操作不可撤销。` : ''}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete}>取消</Button>
                    <Button color="error" variant="contained" onClick={performDelete} disabled={deleting}>删除</Button>
                </DialogActions>
            </Dialog>
            {/* 全局替代 alert 的对话框 */}
            <AlertDialog open={alertDialogOpen} title={alertDialogTitle} content={alertDialogContent} onClose={() => setAlertDialogOpen(false)} />
        </Box>
    );
}

export default SchemeCards;
