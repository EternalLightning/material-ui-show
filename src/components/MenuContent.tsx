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
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import AlertDialog from './AlertDialog';
import {usePlans} from '../hooks/usePlans';

// NOTE: /plans 接口返回格式可能为 { success: true, plans: [...] } 或直接为数组
// 菜单会使用 plan.filename 或 plan.name 作为路由段（filename 优先），并把该值作为 /scheme/<id> 的路径。

const mainListItems = [
    {text: '首页', icon: <HomeRoundedIcon/>, path: '/'},
    {text: '方案管理', icon: <InputIcon/>, path: '/data'},
    // /scheme 的 subItems 将在组件内部动态加载并注入
    {text: '方案信息', icon: <AnalyticsRoundedIcon/>, path: '/scheme', subItems: []},
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

    // 不在组件加载时自动拉取，改为点击“方案信息”时触发
    const {
        plans: schemePlans,
        loading: plansLoading,
        error: plansError,
        reload: reloadPlans
    } = usePlans({autoLoad: false});
    const [schemeSubItems, setSchemeSubItems] = useState<Array<{ text: string, path: string }>>([]);

    // 本地控制：当用户点击“方案信息”时，标记为 pending 并显示右侧加载 UI
    const [pendingSchemeLoad, setPendingSchemeLoad] = useState(false);
    // 标记是否最近一次加载失败（用于显示右侧的红色重试按钮）
    const [schemeFailed, setSchemeFailed] = useState(false);
    // 控制 AlertDialog 的显示
    const [schemeErrorDialogOpen, setSchemeErrorDialogOpen] = useState(false);
    // 重试前的短等待（防止用户频繁点击）
    const [waitingRetry, setWaitingRetry] = useState(false);
    const retryTimeoutRef = React.useRef<number | null>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('schemeSubItemsCache');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && Array.isArray(parsed.items)) {
                    setSchemeSubItems(parsed.items);
                }
            }
        } catch (e) { /* ignore */
        }
    }, []);

    // 清理重试定时器
    useEffect(() => {
        return () => {
            if (retryTimeoutRef.current) {
                window.clearTimeout(retryTimeoutRef.current);
                retryTimeoutRef.current = null;
            }
        };
    }, []);

    // 当后端返回方案列表时，同步子菜单缓存
    useEffect(() => {
        if (!schemePlans) return;
        const items = schemePlans.map(plan => ({
            text: plan.title,
            path: `/scheme/${encodeURIComponent(plan.filename ?? plan.title)}`
        }));
        setSchemeSubItems(items);
        try {
            localStorage.setItem('schemeSubItemsCache', JSON.stringify({ts: Date.now(), items}));
        } catch (e) { /* ignore */
        }
    }, [schemePlans]);

    // 处理 click：如果项目是 /scheme 则触发加载并在完成后展开；否则直接导航
    const handleItemClick = (path: string, itemSubItems: any | undefined) => {
        if (path === '/scheme') {
            // 如果已经展开，则关闭
            if (openSubItems === path) {
                setOpenSubItems!(null);
                setPendingSchemeLoad(false);
                return;
            }
            // 触发加载并展示右侧加载指示
            setPendingSchemeLoad(true);
            setSchemeFailed(false);
            // reloadPlans 会设置 hooks 内部的 loading/error/plans
            reloadPlans();
            return;
        }

        // If the item explicitly declares a subItems property (even if empty) treat it as expandable
        if (itemSubItems !== undefined) {
            setOpenSubItems!(openSubItems === path ? null : path); // 切换子列表的展开状态
        } else {
            navigate(path); // 如果没有子列表，直接导航
        }
    };

    // 监听 usePlans 的 loading/error，完成后根据结果展开/显示错误
    useEffect(() => {
        if (!pendingSchemeLoad) return;

        // 当 loading 完成（plansLoading 变为 false），判断结果
        if (!plansLoading) {
            // 成功
            if (schemePlans && Array.isArray(schemePlans)) {
                setOpenSubItems!('/scheme');
                setPendingSchemeLoad(false);
                setSchemeFailed(false);
                return;
            }
            // 失败
            if (plansError) {
                setSchemeFailed(true);
                setSchemeErrorDialogOpen(true);
                setPendingSchemeLoad(false);
                return;
            }
            // 既没有数据也没有错误（极少见），当作失败处理
            setSchemeFailed(true);
            setSchemeErrorDialogOpen(true);
            setPendingSchemeLoad(false);
        }
    }, [plansLoading, pendingSchemeLoad, schemePlans, plansError, setOpenSubItems]);

    // 当外部添加/删除方案后，触发菜单刷新：
    // - 监听自定义事件 'plans-updated'（window.dispatchEvent(new Event('plans-updated'))）
    // - 监听 storage 事件（跨页/窗口的 localStorage 更新，key: 'schemeSubItemsCache'）
    useEffect(() => {
        const onPlansUpdated = () => {
            // 如果菜单当前是展开状态，尝试重新加载以同步子项（不自动展开）
            if (openSubItems === '/scheme') {
                reloadPlans();
            }
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
                if (openSubItems === '/scheme') {
                    reloadPlans();
                }
            }
        };

        window.addEventListener('plans-updated', onPlansUpdated as EventListener);
        window.addEventListener('storage', onStorage as any);
        return () => {
            window.removeEventListener('plans-updated', onPlansUpdated as EventListener);
            window.removeEventListener('storage', onStorage as any);
        };
    }, [reloadPlans, openSubItems]);

    const loc = useLocation();
    const pathname = loc?.pathname ?? '/';

    return (
        <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
            <List dense>
                {mainListItems.map((item, index) => {
                    const subList = item.path === '/scheme' ? schemeSubItems : (item.subItems ?? []);
                    const isSchemeItem = item.path === '/scheme';
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

                                    {/* 仅在方案项右侧展示：加载中 -> 圆圈；失败 -> 红色重试按钮 */}
                                    {isSchemeItem && (
                                        // 如果处于等待重试或已经开始加载，则显示加载圈；否则如果上次失败显示重试按钮
                                        ((pendingSchemeLoad && plansLoading) || waitingRetry) ? (
                                            <CircularProgress size={20} sx={{ml: 0.5}}/>
                                        ) : (
                                            schemeFailed ? (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => {
                                                        // 防止重复点击
                                                        if (waitingRetry) return;
                                                        setWaitingRetry(true);
                                                        setSchemeFailed(false);
                                                        // 小等待后再真正发起请求
                                                        retryTimeoutRef.current = window.setTimeout(() => {
                                                            setWaitingRetry(false);
                                                            setPendingSchemeLoad(true);
                                                            reloadPlans();
                                                            retryTimeoutRef.current = null;
                                                        }, 700);
                                                    }}
                                                    sx={{ml: 0.5, height: 30}}
                                                >
                                                    重试
                                                </Button>
                                            ) : null
                                        )
                                    )}
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
                                    {plansLoading && Array.isArray(subList) && subList.length === 0 && (
                                        <ListItem disablePadding sx={{pl: 4, paddingBottom: '2px'}}>
                                            <ListItemText primary="加载中..."/>
                                        </ListItem>
                                    )}
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
                            selected={item.path === pathname}
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

            {/* AlertDialog 显示加载失败信息 */}
            <AlertDialog
                open={schemeErrorDialogOpen}
                title="获取方案失败"
                content={<div>{plansError ?? '无法获取方案，请重试'}</div>}
                onClose={() => setSchemeErrorDialogOpen(false)}
            />
        </Stack>
    );
}
