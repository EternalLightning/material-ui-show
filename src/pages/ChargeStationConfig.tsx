import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Box, Button, CardActionArea, Chip} from "@mui/material";
import Card from "@mui/material/Card";
import FileUploadButton from '../components/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import SchemeCards from "../components/SchemeCards";

export default function ChargeStationConfig() {
    const sections = [
        '充电设施位置选择',
        '充电站信息',
        '充电站充电需求',
        '拓扑设置',
        '新能源出力设置',
    ];

    // 按钮状态管理
    const [btnState, setBtnState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const handleUploadClick = () => {
        if (btnState === 'idle') {
            setBtnState('loading');
            setTimeout(() => {
                if (selectedFile) {
                    setBtnState('success');
                } else {
                    setBtnState('error');
                }
                setTimeout(() => setBtnState('idle'), 2000);
            }, 500);
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
                                size="large"
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
            <SchemeCards />
        </Box>
);
};