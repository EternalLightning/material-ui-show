import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            align="center"
            {...props}
            sx={[
                {
                    color: 'text.secondary',
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        >
            {'Copyright © '}
            <Link
                color="inherit"
                href="https://griseo.nimo.page/"
                sx={{
                    transition: 'color 0.3s ease', // 添加过渡效果
                    '&:hover': {
                        color: '#87CEFA', // 悬停时的颜色
                    },
                }}
            >
                EternalLightning
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}