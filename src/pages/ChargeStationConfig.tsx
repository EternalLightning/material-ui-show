import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Box, Button, Chip} from "@mui/material";
import Card from "@mui/material/Card";
import FileUploadButton from '../components/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import SchemeCards from "../components/SchemeCards";
import AlertDialog from '../components/AlertDialog';
import {buildBackendUrl} from '../config/api';

export default function ChargeStationConfig() {
    // 按钮状态管理
    const [btnState, setBtnState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    // 方案名称
    const [schemeName, setSchemeName] = React.useState<string>('');
    // 用于触发 SchemeCards 刷新的 key，每次自增会通知子组件重新加载
    const [refreshKey, setRefreshKey] = React.useState<number>(0);
    // 全局 alert 对话框状态（替代 window.alert）
    const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
    const [alertDialogTitle, setAlertDialogTitle] = React.useState<string | undefined>(undefined);
    const [alertDialogContent, setAlertDialogContent] = React.useState<React.ReactNode | undefined>(undefined);
    const [alertDialogCopyText, setAlertDialogCopyText] = React.useState<string | null>(null); // 新增 copyText 状态

    // 上传函数：先把方案名称 POST 到 /plans（JSON），再上传文件到 /upload
    const handleUploadClick = async () => {
        if (btnState === 'loading') return; // 防止重复点击

        // 在点击后立即捕获当前输入并清空 UI（上传继续使用捕获的值）
        const name = schemeName;
        const file = selectedFile;
        setSchemeName('');
        setSelectedFile(null);

        // 名称校验：不能为空
        if (!name || name.trim() === '') {
            setBtnState('error');
            setAlertDialogTitle('提示');
            setAlertDialogContent('请先输入方案名称');
            setAlertDialogOpen(true);
            setTimeout(() => setBtnState('idle'), 1500);
            return;
        }

        if (!file) {
            setBtnState('error');
            setAlertDialogTitle('提示');
            setAlertDialogContent('请先选择 .m 格式的方案文件');
            setAlertDialogOpen(true);
            setTimeout(() => setBtnState('idle'), 1500);
            return;
        }

        // 简单的客户端文件类型校验
        if (!file.name.toLowerCase().endsWith('.m')) {
            setBtnState('error');
            setAlertDialogTitle('提示');
            setAlertDialogContent('只允许上传 .m 文件');
            setAlertDialogOpen(true);
            setTimeout(() => setBtnState('idle'), 1500);
            return;
        }

        setBtnState('loading');

        // 合并 API：向 /upload 发送 FormData，包含 name（方案名）和 file（方案文件）
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);

        try {
            const res = await fetch(buildBackendUrl('/upload'), {
                method: 'POST',
                body: formData,
            });

            let data: any = null;
            try {
                data = await res.json();
            } catch (e) { /* ignore parse error */
            }

            if (data?.success) {
                setBtnState('success');
                setAlertDialogTitle('成功');
                setAlertDialogContent(data?.message || '上传成功');
                setAlertDialogOpen(true);
                console.log('后端返回：', data);
                // 后端统一返回成功后，触发 SchemeCards 刷新
                setRefreshKey(prev => prev + 1);
                // 通知全局菜单刷新（用于其他打开的窗口/组件）
                try {
                    window.dispatchEvent(new Event('plans-updated'));
                } catch (e) { /* ignore */
                }
            } else {
                setBtnState('error');
                // 如果是文件检查不通过，且包含 detail，则把 detail 一并显示（保持换行）
                // 构造可以滚动展示 detail 的内容，并把 detail 原文作为复制文本
                const detailText = data?.detail;
                setAlertDialogTitle('文件检查不通过');
                setAlertDialogContent(
                    <Box sx={{maxHeight: 300, overflow: 'auto', whiteSpace: 'pre-wrap'}}>
                        <Box sx={{mb: 1, fontWeight: 'bold'}}>{data?.message}</Box>
                        <Box sx={{fontFamily: 'monospace', fontSize: 13}}>{detailText}</Box>
                    </Box>
                );
                setAlertDialogCopyText(detailText);
                setAlertDialogOpen(true);
            }
        } catch (e) {
            const msg = (e as Error)?.message || String(e);
            setBtnState('error');
            setAlertDialogTitle('错误');
            setAlertDialogContent('网络或请求错误：' + msg);
            setAlertDialogOpen(true);
        } finally {
            setTimeout(() => setBtnState('idle'), 2000);
        }
    };

    const handleRemove = () => {
        setSelectedFile(null);
        // 如需额外通知父组件已清空，可在这里回调
    };

    return (
        <Box sx={{width: '80%', maxWidth: {sm: '100%', md: '1900px'}}}>
            <Typography variant="h6" gutterBottom>
                添加新方案
            </Typography>
            <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {/* 左侧组件，设置间距 */}
                    <Box display="flex" alignItems="center">
                        <TextField
                            label="方案名称"
                            id="scheme-name"
                            variant="standard"
                            sx={{marginRight: 16}}
                            value={schemeName}
                            onChange={(e) => setSchemeName(e.target.value)}
                        />
                        <FileUploadButton
                            accept=".m"
                            onFileSelect={(file) => {
                                setSelectedFile(file);
                                console.log('已选择:', file);
                            }}
                        />
                        {selectedFile && (
                            <Chip
                                label={selectedFile.name}
                                variant="outlined"
                                size="medium"
                                onDelete={handleRemove}
                            />
                        )}
                    </Box>
                    {/* 按钮放最右 */}
                    <Button
                        variant="contained"
                        color={
                            btnState === 'success' ? 'success'
                                : btnState === 'error' ? 'error'
                                    : btnState === 'idle' ? 'info'
                                        : 'inherit'
                        }
                        onClick={handleUploadClick}
                        sx={{minWidth: 120, transitionDuration: '0.2s'}}
                    >
                        点击上传
                        {btnState === 'loading' && (
                            <CircularProgress size={20} sx={{ml: 1}}/>
                        )}
                        {btnState === 'success' && (
                            <CheckIcon sx={{ml: 1}}/>
                        )}
                        {btnState === 'error' && (
                            <ClearIcon sx={{ml: 1}}/>
                        )}
                    </Button>
                </Box>
            </Card>
            <Typography variant="h6" gutterBottom>
                管理方案
            </Typography>
            <SchemeCards refreshKey={refreshKey}/>
            {/* 全局替代 alert 的对话框 */}
            <AlertDialog
                open={alertDialogOpen}
                title={alertDialogTitle}
                content={alertDialogContent}
                copyText={alertDialogCopyText ?? null}
                onClose={() => {
                    setAlertDialogOpen(false);
                    setAlertDialogCopyText(null);
                }}
            />
        </Box>
    );
};
