import * as React from 'react';
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
import {context} from "../../src/exportType";

const mainListItems = [
    {text: '首页', icon: <HomeRoundedIcon/>, path: '/'},
    {text: '参数输入', icon: <InputIcon/>, path: '/data'},
    {
        text: '方案基础信息',
        icon: <AnalyticsRoundedIcon/>,
        path: '/scheme',
        subItems: [
            {text: '方案1', path: '/scheme/scheme1'},
            {text: '方案2', path: '/scheme/scheme2'},
            {text: '方案3', path: '/scheme/scheme3'},
        ]
    },
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

    const handleItemClick = (path: string, subItems?: any[]) => {
        if (subItems && subItems.length > 0) {
            setOpenSubItems!(openSubItems === path ? null : path); // 切换子列表的展开状态
        } else {
            navigate(path); // 如果没有子列表，直接导航
        }
    };

    return (
        <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem key={index} disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                selected={item.path === useLocation().pathname || (item.subItems && item.subItems.some(subItem => subItem.path === useLocation().pathname))}
                                onClick={() => handleItemClick(item.path, item.subItems)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text}/>
                            </ListItemButton>
                        </ListItem>
                        {/* 子列表 */}
                        <Collapse in={openSubItems === item.path} timeout="auto">
                            <List component="div" disablePadding>
                                {item.subItems && item.subItems.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} disablePadding sx={{pl: 4}}>
                                        <ListItemButton
                                            selected={subItem.path === useLocation().pathname}
                                            onClick={() => {navigate(subItem.path);}}
                                        >
                                            <ListItemText primary={subItem.text}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            selected={item.path === useLocation().pathname}
                            onClick={() => {navigate(item.path);}}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}
