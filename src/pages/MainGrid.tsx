import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type {StatCardProps} from '../components/StatCard';
import StatCard from '../components/StatCard';
import SchemeCards from "../components/SchemeCards";
import {useNavigate} from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function MainGrid() {
    const navigate = useNavigate();

    // 示例统计数据（可替换为真实后端数据）
    const stats: StatCardProps[] = [
        {title: '累计计算次数', value: '128', interval: '近30天', trend: 'up', data: [10, 12, 8, 14, 16, 20]},
        {title: '最近计算耗时', value: '00:02:34', interval: '上次运行', trend: 'neutral', data: [2, 3, 4, 2, 5, 3]},
        {title: '当前方案数量', value: '8', interval: '实时', trend: 'up', data: [5, 6, 7, 8, 8, 8]},
    ];

  return (
      <Box sx={{
          width: '80%',
          maxWidth: {sm: '100%', md: '1900px'},
      }}>

          {/* 顶部：页面标题 */}
          <Typography component="h2" variant="h5" sx={{mb: 2}}>
              仪表盘
          </Typography>

          {/* 概览区 */}
          <Grid container spacing={2} sx={{mb: 3, alignItems: 'stretch'}}>
              <Grid size={{xs: 12, md: 8}}>
                  <Card variant="outlined" sx={{height: '100%'}}>
                      <CardContent>
                          <Typography variant="h6" gutterBottom>项目简介</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                              本系统用于展示和管理电动汽车配网的潮流计算与优化结果。它基于 Material UI
                              搭建，用于组织案例、上传数据、配置求解器并运行优化程序。
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                              主要功能示例：
                              <ul>
                                  <li>管理案例与上传数据（network / pv / wind / ess 等矩阵）。</li>
                                  <li>配置求解参数（求解器、时间步、输出路径等）。</li>
                                  <li>启动计算并查看优化结果与配置方案。</li>
                              </ul>
                          </Typography>
                          <Typography variant="caption" color="text.secondary">更多详细说明请查看项目
                              README。</Typography>
                      </CardContent>
                  </Card>
              </Grid>

              <Grid size={{xs: 12, md: 2}}>
                  <Card variant="outlined" sx={{height: '100%'}}>
                      <CardContent>
                          <Typography variant="h6" gutterBottom>快速操作</Typography>
                          <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                              <Button variant="contained" color="info"
                                      onClick={() => navigate('/data')}>数据管理</Button>
                              <Button variant="contained" color="success"
                                      onClick={() => navigate('/calc')}>开始计算</Button>
                              <Button variant="outlined" onClick={() => navigate('/settings')}>系统配置</Button>
                              <Button variant="outlined" onClick={() => navigate('/scheme/scheme1')}>方案管理</Button>
                          </Box>
                      </CardContent>
                  </Card>
              </Grid>

              <Grid size={{xs: 12, md: 2}}>
                  <Card variant="outlined" sx={{height: '100%'}}>
                      <CardContent>
                          <Typography variant="h6" gutterBottom>外部链接</Typography>
                          <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                              <Button component="a" href="https://see.sjtu.edu.cn/" target="_blank"
                                      rel="noopener noreferrer" variant="outlined"
                                      startIcon={<SchoolIcon/>}>前往学院主页</Button>
                              <Button component="a" href="https://xiaoyuan-xu.github.io/" target="_blank"
                                      rel="noopener noreferrer" variant="outlined"
                                      startIcon={<PersonIcon/>}>前往导师主页</Button>
                              <Button component="a" href="https://griseo.nimo.page/" target="_blank"
                                      rel="noopener noreferrer" variant="outlined"
                                      startIcon={<ArticleIcon/>}>前往作者博客</Button>
                              <Button component="a" href="https://github.com/EternalLightning" target="_blank"
                                      rel="noopener noreferrer" variant="outlined"
                                      startIcon={<GitHubIcon/>}>前往作者GitHub</Button>
                          </Box>
                      </CardContent>
                  </Card>
              </Grid>
          </Grid>

          {/* 统计卡片 */}
          <Grid container spacing={2} sx={{mb: 3}}>
              {stats.map((s, idx) => (
                  <Grid size={{xs: 12, md: 4}} key={s.title + idx}>
                      <StatCard {...s} />
                  </Grid>
              ))}
          </Grid>

          {/* 方案列表（保留） */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          最近计算/保存的方案
      </Typography>
          <SchemeCards allowDelete={false}/>

    </Box>
  );
}
