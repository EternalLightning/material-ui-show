import React from 'react';
import {Box, Button, Typography} from '@mui/material';

export default function ErrorRetryPanel({message, onRetry, row = false}: {
    message?: string;
    detail?: string;
    onRetry?: () => void;
    row?: boolean
}) {
    if (row) {
        return (
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, p: 0}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2}}>
                    <Typography variant="h6" color="error">{message ?? '发生错误'}</Typography>
                    <Box sx={{flex: '0 0 auto'}}>
                        <Button variant="contained" color="primary" onClick={onRetry}>重试</Button>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 2}}>
            <Typography variant="h6" color="error">{message ?? '发生错误'}</Typography>
            <Button variant="contained" color="primary" onClick={onRetry}>重试</Button>
        </Box>
    );
}
