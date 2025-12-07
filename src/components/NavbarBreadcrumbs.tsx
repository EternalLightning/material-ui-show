import * as React from 'react';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, {breadcrumbsClasses} from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import {useLocation} from "react-router-dom";
import {buildBackendUrl} from '../config/api';

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
    ['/data', '方案管理'],
    ['/calc', '优化配置结果'],
    ['/settings', '求解设置'],
    ['/about', '关于'],
]);

async function resolveSchemeNameFromBackend(pathname: string): Promise<string | null> {
    // pathname 可能为 /scheme/<encodedId>
    const seg = pathname.split('/').filter(Boolean).pop();
    if (!seg) return null;
    const decoded = decodeURIComponent(seg);

    // 先尝试本地缓存
    try {
        const raw = localStorage.getItem('schemeSubItemsCache');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.items)) {
                const found = parsed.items.find((it: any) => String(it.id) === decoded || String(it.path).endsWith(encodeURIComponent(decoded)));
                if (found) return found.text ?? decoded;
            }
        }
    } catch (e) { /* ignore */
    }

    // 请求后端 /plans
    try {
        const res = await fetch(buildBackendUrl('/plans'));
        if (!res.ok) return decoded;
        const j = await res.json();
        let plans: any[] = [];
        if (j && typeof j === 'object' && 'success' in j && Array.isArray(j.plans)) plans = j.plans;
        else if (Array.isArray(j)) plans = j;
        else if (j && Array.isArray(j?.data)) plans = j.data;

        const found = plans.find((p: any) => {
            const id = p.filename ?? p.name ?? p;
            return String(id) === decoded;
        });
        if (found) return found.name ?? found.filename ?? decoded;
    } catch (e) { /* ignore */
    }

    return decoded;
}

export default function NavbarBreadcrumbs() {
    const currentPath = useLocation().pathname;
    const [schemeLabel, setSchemeLabel] = React.useState<string | null>(null);

    React.useEffect(() => {
        let mounted = true;

        async function resolve() {
            if (!currentPath.startsWith('/scheme/')) {
                setSchemeLabel(null);
                return;
            }
            const seg = currentPath.split('/').filter(Boolean).pop() ?? '';
            // optimistic show decoded seg while resolving
            setSchemeLabel(decodeURIComponent(seg));
            const resolved = await resolveSchemeNameFromBackend(currentPath);
            if (mounted) setSchemeLabel(resolved ?? decodeURIComponent(seg));
        }

        resolve();
        return () => {
            mounted = false;
        }
    }, [currentPath]);

    return (
        <StyledBreadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextRoundedIcon fontSize="small"/>}
        >
            <Typography variant="body1">电动汽车充电站配网优化项目</Typography>
            {currentPath.startsWith('/scheme/') && (
                <Typography variant="body1">方案信息</Typography>
            )}
            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                {currentPath.startsWith('/scheme/') ? (schemeLabel ?? '方案') : (pathName.get(currentPath) ?? '')}
            </Typography>
        </StyledBreadcrumbs>
    );
}