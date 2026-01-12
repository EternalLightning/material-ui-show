import React from 'react';
import {Avatar, Box, Chip, Container, Link, Stack, Typography} from '@mui/material';

const skills = [
    '前端开发', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Python', 'C++', '算法', '数据结构', 'Linux', 'Git'
];

export default function About() {
    return (
        <Container maxWidth="md" sx={{py: 4}}>
            <Box display="flex" alignItems="center" mb={3}>
                <Avatar src="https://griseo.nimo.page/MyHTML/img/head.jpg" alt="avatar"
                        sx={{width: 80, height: 80, mr: 2}}/>
                <Box>
                    <Typography variant="h4" fontWeight="bold">111</Typography>
                    <Typography variant="subtitle1" color="text.secondary">电气工程及其自动化</Typography>
                </Box>
            </Box>
            <Typography variant="body1" sx={{marginBottom: 3}}>
                留空
            </Typography>
            <Typography variant="h6" gutterBottom>
                联系方式
            </Typography>
            <Stack direction="row" spacing={2} mb={2}>
                <Link href="mailto:EternalLightning_@outlook.com" target="_blank" underline="hover">邮箱：EternalLightning_@outlook.com</Link>
                <Link href="https://github.com/EternalLightning" target="_blank" underline="hover">GitHub</Link>
                <Link href="https://griseo.nimo.page" target="_blank" underline="hover">个人主页</Link>
            </Stack>
            <Typography variant="h6" gutterBottom>技能</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
                {skills.map(skill => (
                    <Chip key={skill} label={skill} color="primary" variant="outlined" sx={{mb: 1}}/>
                ))}
            </Stack>
            <Box mt={4}>
                <Typography variant="body2" color="text.secondary">
                    本页面由使用 React + MUI 构建，感谢您的访问！
                </Typography>
            </Box>
        </Container>
    );
}

