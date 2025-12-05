import * as React from 'react';
import {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import {useLocation, useNavigate} from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import InputIcon from '@mui/icons-material/Input';
import {context} from "../exportType";
import AlertDialog from './AlertDialog';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

// NOTE: /plans 接口返回格式可能为 { success: true, plans: [...] } 或直接为数组
// 菜单会使用 plan.filename 或 plan.name 作为路由段（filename 优先），并把该值作为 /scheme/<id> 的路径。

const mainListItems = [
    {text: '首页', icon: <HomeRoundedIcon/>, path: '/'},
    {text: '方案管理', icon: <InputIcon/>, path: '/data'},
    // /scheme 的 subItems 将在组件内部动态加载并注入
    {text: '方案基础信息', icon: <AnalyticsRoundedIcon/>, path: '/scheme', subItems: []},
    {text: '优化配置结果', icon: <AssignmentRoundedIcon/>, path: '/calc'},
];

const secondaryListItems = [
    {text: '求解设置', icon: <SettingsRoundedIcon/>, path: '/settings'},
    {text: '关于', icon: <InfoRoundedIcon/>, path: '/about'},
];

export default function MenuContent() {
    const navigate = useNavigate();
    const {
        openSubItems, setOpenSubItems,
    } = React.useContext(context); // 管理子列表的展开状态

    const [schemeSubItems, setSchemeSubItems] = useState<Array<{ text: string, path: string }>>([]);

    // 从环境读取后端地址
    const backend = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL) ? String(import.meta.env.VITE_BACKEND_URL).replace(/\/$/, '') : '';

    const [plansLoading, setPlansLoading] = useState<boolean>(false);
    const [plansError, setPlansError] = useState<string | null>(null);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertContent, setAlertContent] = useState('');

    const loadPlans = React.useCallback(async () => {
        setAlertOpen(false);
        if (!backend) {
            setPlansError('未配置后端地址');
            setAlertOpen(true);
            setAlertTitle('加载失败');
            setAlertContent('未配置后端地址');
            return;
        }
        // 如果已有缓存并非强制刷新，可先保留并再异步刷新
        setPlansLoading(true);
        setPlansError(null);
        try {
            const res = await fetch(backend + '/plans');
            if (!res.ok) {
                const text = await res.text().catch(() => '');
                setPlansLoading(false);
                setPlansError(`HTTP ${res.status} ${res.statusText} ${text}`);
                setAlertOpen(true);
                setAlertTitle('加载失败');
                setAlertContent(`HTTP ${res.status} ${res.statusText} ${text}`);
                return;
            }
            const j = await res.json();
            let plans: any[] = [];
            if (j && typeof j === 'object' && 'success' in j && Array.isArray(j.plans)) plans = j.plans;
            else if (Array.isArray(j)) plans = j;
            else if (j && Array.isArray(j?.data)) plans = j.data;

            const items = plans.map((p: any) => {
                if (typeof p === 'string') return {text: p, id: p, path: `/scheme/${encodeURIComponent(p)}`};
                const id = p.filename ?? p.name ?? p;
                const text = p.name ?? p.filename ?? String(id);
                return {text: String(text), id: String(id), path: `/scheme/${encodeURIComponent(id)}`};
            });

            setSchemeSubItems(items);
            // 缓存到 localStorage（存储 items 与时间戳）
            try {
                localStorage.setItem('schemeSubItemsCache', JSON.stringify({ts: Date.now(), items}));
            } catch (e) { /* ignore */
            }
            setPlansLoading(false);
            setPlansError(null);
        } catch (err: any) {
            setPlansLoading(false);
            setPlansError(err?.message ?? String(err));
            setAlertOpen(true);
            setAlertTitle('加载失败');
            setAlertContent(err?.message ?? String(err));
        }
    }, [backend]);

    // 初始化：先加载本地缓存（若存在），然后异步刷新真正数据
    useEffect(() => {
        try {
            const raw = localStorage.getItem('schemeSubItemsCache');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && Array.isArray(parsed.items)) {
                    setSchemeSubItems(parsed.items);
                }
            }
        } catch (e) { /* ignore parse errors */
        }
        // 异步刷新（不 force by default）
        loadPlans();
    }, [loadPlans]);

    // 当外部添加/删除方案后，触发菜单刷新：
    // - 监听自定义事件 'plans-updated'（window.dispatchEvent(new Event('plans-updated'))）
    // - 监听 storage 事件（跨页/窗口的 localStorage 更新，key: 'schemeSubItemsCache'）
    useEffect(() => {
        const onPlansUpdated = () => {
            loadPlans();
        };
        const onStorage = (e: StorageEvent) => {
            if (!e) return;
            if (e.key === 'schemeSubItemsCache') {
                // 读取缓存并刷新
                try {
                    const raw = localStorage.getItem('schemeSubItemsCache');
                    if (raw) {
                        const parsed = JSON.parse(raw);
                        if (parsed && Array.isArray(parsed.items)) {
                            setSchemeSubItems(parsed.items);
                        }
                    }
                } catch (err) { /* ignore */
                }
                // 同时确保从后端刷新
                loadPlans();
            }
        };

        window.addEventListener('plans-updated', onPlansUpdated as EventListener);
        window.addEventListener('storage', onStorage as any);
        return () => {
            window.removeEventListener('plans-updated', onPlansUpdated as EventListener);
            window.removeEventListener('storage', onStorage as any);
        };
    }, [loadPlans]);

    const handleItemClick = (path: string, itemSubItems: any | undefined) => {
        // If the item explicitly declares a subItems property (even if empty) treat it as expandable
        if (itemSubItems !== undefined) {
            setOpenSubItems!(openSubItems === path ? null : path); // 切换子列表的展开状态
        } else {
            navigate(path); // 如果没有子列表，直接导航
        }
    };

    const loc = useLocation();
    const pathname = loc?.pathname ?? '/';

    return (
        <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
            <List dense>
                {mainListItems.map((item, index) => {
                    const subList = item.path === '/scheme' ? schemeSubItems : (item.subItems ?? []);
                    return (
                        <React.Fragment key={index}>
                            <ListItem key={index} disablePadding sx={{display: 'block', paddingBottom: '2px'}}>
                                <Stack direction="row" alignItems="center" sx={{width: '100%'}}>
                                    <ListItemButton
                                        selected={item.path === pathname || (Array.isArray(subList) && subList.some(subItem => subItem.path === pathname))}
                                        onClick={() => handleItemClick(item.path, item.subItems)}
                                        sx={{flexGrow: 1}}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text}/>
                                    </ListItemButton>
                                    {item.path === '/scheme' && (plansLoading ?
                                        <CircularProgress size={20} sx={{ml: 0.5}}/> : plansError ? <Button
                                            variant="contained"
                                            color={'error'}
                                            sx={{marginRight: 2, height: 24}}
                                            onClick={() => {
                                                loadPlans();
                                            }}>重试</Button> : null)}
                                </Stack>
                            </ListItem>
                            {/* 子列表 */}
                            <Collapse in={openSubItems === item.path} timeout="auto">
                                <List component="div" disablePadding>
                                    {Array.isArray(subList) && subList.map((subItem, subIndex) => (
                                        <ListItem key={subIndex} disablePadding sx={{pl: 4, paddingBottom: '2px'}}>
                                            <ListItemButton
                                                selected={subItem.path === pathname}
                                                onClick={() => {
                                                    navigate(subItem.path);
                                                }}
                                            >
                                                <ListItemText primary={subItem.text}/>
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    );
                })}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block', paddingBottom: '2px'}}>
                        <ListItemButton
                            selected={item.path === useLocation().pathname}
                            onClick={() => {
                                navigate(item.path);
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <AlertDialog open={alertOpen} title={alertTitle} content={alertContent}
                         onClose={() => setAlertOpen(false)}/>
        </Stack>
    );
}
