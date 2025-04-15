import * as React from 'react';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, {breadcrumbsClasses} from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import {useLocation} from "react-router-dom";

const StyledBreadcrumbs = styled(Breadcrumbs)(({theme}) => ({
    margin: theme.spacing(1, 0),
    [`& .${breadcrumbsClasses.separator}`]: {
        color: (theme.vars || theme).palette.action.disabled,
        margin: 1,
    },
    [`& .${breadcrumbsClasses.ol}`]: {
        alignItems: 'center',
    },
}));

const pathName = new Map<string, string>([
    ['/', '首页'],
    ['/data', '参数输入'],
    ['/calc', '数据计算'],
    ['/settings', '求解设置'],
    ['/about', '关于'],
    ['/scheme/scheme1', '方案1'],
    ['/scheme/scheme2', '方案2'],
    ['/scheme/scheme3', '方案3'],
]);

export default function NavbarBreadcrumbs() {
    const currentPath = useLocation().pathname;

    return (
        <StyledBreadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextRoundedIcon fontSize="small"/>}
        >
            <Typography variant="body1">电动汽车充电站配网优化项目</Typography>
            {currentPath.startsWith('/scheme/') && (
                <Typography variant="body1">计算结果</Typography>
            )}
            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                {pathName.get(currentPath)}
            </Typography>
        </StyledBreadcrumbs>
    );
}