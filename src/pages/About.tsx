import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export default function About() {
  return (
      <Container maxWidth="lg" sx={{py: 4}}>
        {/* Header Section */}
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
              src="https://griseo.nimo.page/MyHTML/img/head.jpg"
              alt="avatar"
              sx={{width: 120, height: 120, mr: 3}}
          />
          <Box>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              永恒闪电
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              上海交通大学 本科生
            </Typography>
            <Typography variant="h5" color="text.secondary">
              电气工程及其自动化
            </Typography>
          </Box>
        </Box>

        {/* Contact Links */}
        <Typography variant="h4" gutterBottom sx={{mb: 2}}>
          联系方式
        </Typography>
        <Stack direction="row" spacing={3} mb={4}>
          <Link href="mailto:EternalLightning_@outlook.com" target="_blank" underline="hover" sx={{fontSize: '1.1rem'}}>
            邮箱：EternalLightning_@outlook.com
          </Link>
          <Link href="https://github.com/EternalLightning" target="_blank" underline="hover" sx={{fontSize: '1.1rem'}}>
            GitHub
          </Link>
          <Link href="https://griseo.nimo.page" target="_blank" underline="hover" sx={{fontSize: '1.1rem'}}>
            个人主页
          </Link>
        </Stack>

        {/* Education */}
        <Typography variant="h4" gutterBottom sx={{mb: 2}}>
          教育经历
        </Typography>
        <List sx={{mb: 4}}>
          <ListItem>
            <ListItemText primary="上海交通大学 （2022 —— 至今）"/>
          </ListItem>
          <ListItem sx={{pl: 4}}>
            <ListItemText secondary="本科在读 电气工程及其自动化 （预计于2026年6月毕业）"/>
          </ListItem>
        </List>

        {/* Skills and Grades */}
        <Typography variant="h4" gutterBottom sx={{mb: 2}}>
          专业知识与技能
        </Typography>
        <Typography variant="h6" gutterBottom sx={{mb: 2}}>
          部分课程学分与成绩
        </Typography>
        <TableContainer component={Paper} sx={{mb: 4}}>
          <Table>
            <TableHead>
              <TableRow sx={{backgroundColor: '#66ccff'}}>
                <TableCell colSpan={6}
                           sx={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.1rem'}}>
                  部分课程学分与成绩
                </TableCell>
              </TableRow>
              <TableRow sx={{backgroundColor: '#cc87fa'}}>
                <TableCell sx={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>课程名称</TableCell>
                <TableCell sx={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>学分</TableCell>
                <TableCell sx={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>成绩</TableCell>
                <TableCell sx={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>课程名称</TableCell>
                <TableCell sx={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>学分</TableCell>
                <TableCell sx={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>成绩</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>程序设计（C++）</TableCell>
                <TableCell sx={{textAlign: 'center'}}>4.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>99</TableCell>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>电路理论</TableCell>
                <TableCell sx={{textAlign: 'center'}}>4.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>97</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>线性代数</TableCell>
                <TableCell sx={{textAlign: 'center'}}>3.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>100</TableCell>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>数据结构</TableCell>
                <TableCell sx={{textAlign: 'center'}}>3.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>97</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>高等数学I</TableCell>
                <TableCell sx={{textAlign: 'center'}}>6.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>88</TableCell>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>数字电子技术</TableCell>
                <TableCell sx={{textAlign: 'center'}}>2.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>95</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>高等数学II</TableCell>
                <TableCell sx={{textAlign: 'center'}}>4.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>89</TableCell>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>数理方法</TableCell>
                <TableCell sx={{textAlign: 'center'}}>3.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>98</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>大学物理(A类）（1）</TableCell>
                <TableCell sx={{textAlign: 'center'}}>4.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>96</TableCell>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>概率统计</TableCell>
                <TableCell sx={{textAlign: 'center'}}>3.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>93</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>大学物理(A类）（2）</TableCell>
                <TableCell sx={{textAlign: 'center'}}>4.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>96</TableCell>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>模拟电子技术</TableCell>
                <TableCell sx={{textAlign: 'center'}}>3.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>100</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>电机学（上）</TableCell>
                <TableCell sx={{textAlign: 'center'}}>2.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>95</TableCell>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>电机学（下）</TableCell>
                <TableCell sx={{textAlign: 'center'}}>2.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>96</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>数字信号处理（B类）</TableCell>
                <TableCell sx={{textAlign: 'center'}}>2.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>99</TableCell>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>自动控制原理B</TableCell>
                <TableCell sx={{textAlign: 'center'}}>3.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>92</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>电力电子技术基础</TableCell>
                <TableCell sx={{textAlign: 'center'}}>3.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>97.40</TableCell>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>高电压技术</TableCell>
                <TableCell sx={{textAlign: 'center'}}>2.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>97</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>电气工程基础（1）</TableCell>
                <TableCell sx={{textAlign: 'center'}}>4.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>87</TableCell>
                <TableCell sx={{
                  backgroundColor: '#87cefa',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white'
                }}>电磁场</TableCell>
                <TableCell sx={{textAlign: 'center'}}>2.0</TableCell>
                <TableCell sx={{textAlign: 'center'}}>88</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <List sx={{mb: 4}}>
          <ListItem>
            <ListItemText primary="学积分 91.47；绩点 3.957；排名 2/119。"/>
          </ListItem>
          <ListItem>
            <ListItemText primary="编程语言方面：熟悉 C++, Python, MATLAB, HTML, CSS, 接触过 C#, Verilog, Java。"/>
          </ListItem>
          <ListItem>
            <ListItemText primary="算法能力：CSP-S 三等奖，NOIP 一等奖，熟悉排序、搜索、图论、数据结构等。"/>
          </ListItem>
          <ListItem>
            <ListItemText
                primary="获得奖项：电院新生杯二等奖，特高压奖学金，上海交通大学 B 类奖学金，校优秀团员、三好学生，互联网+ 市赛金奖"/>
          </ListItem>
          <ListItem>
            <ListItemText
                primary="其他：掌握 Linux 常用命令以及发行版(Ubuntu)，掌握 Git 进行版本控制和代码托管，熟悉 Markdown 进行文本写作与排版，掌握 Office 等办公软件的使用"/>
          </ListItem>
        </List>

        {/* Projects */}
        <Typography variant="h4" gutterBottom sx={{mb: 3}}>
          项目经历
        </Typography>
        <Box
            display="grid"
            gridTemplateColumns={{xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)'}}
            gap={3}
            sx={{mb: 4}}
        >
          <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flexGrow: 1, textAlign: 'center'}}>
              <Typography variant="h6" gutterBottom>MyHTML</Typography>
              <Typography variant="body2" color="text.secondary">我的第一个网页项目</Typography>
              <Link href="https://github.com/EternalLightning/MyHTML" target="_blank" underline="hover">GitHub
                Link</Link>
            </CardContent>
          </Card>
          <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flexGrow: 1, textAlign: 'center'}}>
              <Typography variant="h6" gutterBottom>EternalLightning's blog!</Typography>
              <Typography variant="body2" color="text.secondary">我的博客</Typography>
              <Link href="https://EternalLightning.github.io" target="_blank" underline="hover">Blog Link</Link>
            </CardContent>
          </Card>
          <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flexGrow: 1, textAlign: 'center'}}>
              <Typography variant="h6" gutterBottom>DataStructure</Typography>
              <Typography variant="body2" color="text.secondary">数据结构学习</Typography>
              <Link href="https://github.com/EternalLightning/DataStructure" target="_blank" underline="hover">GitHub
                Link</Link>
            </CardContent>
          </Card>
          <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flexGrow: 1, textAlign: 'center'}}>
              <Typography variant="h6" gutterBottom>ECC_Qt</Typography>
              <Typography variant="body2" color="text.secondary">椭圆曲线加密与Qt学习</Typography>
              <Link href="https://github.com/EternalLightning/ECC_Qt" target="_blank" underline="hover">GitHub
                Link</Link>
            </CardContent>
          </Card>
          <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flexGrow: 1, textAlign: 'center'}}>
              <Typography variant="h6" gutterBottom>Y3Game</Typography>
              <Typography variant="body2" color="text.secondary">网易Y3 GameJam参赛作品</Typography>
              <Link href="https://github.com/EternalLightning/Y3Game" target="_blank" underline="hover">GitHub
                Link</Link>
            </CardContent>
          </Card>
          <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flexGrow: 1, textAlign: 'center'}}>
              <Typography variant="h6" gutterBottom>Drone</Typography>
              <Typography variant="body2" color="text.secondary">上海交通大学“新生杯”无人机飞行</Typography>
              <Link href="https://github.com/Yiliu1412/drone_final" target="_blank" underline="hover">GitHub Link</Link>
            </CardContent>
          </Card>
        </Box>

        {/* Contact Details */}
        <Typography variant="h4" gutterBottom sx={{mb: 2}}>
          联系方式
        </Typography>
        <Box sx={{mb: 4}}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="body1" sx={{mr: 2}}>邮箱：</Typography>
            <Link href="mailto:EternalLightning_@outlook.com" target="_blank"
                  underline="hover">EternalLightning_@outlook.com</Link>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="body1" sx={{mr: 2}}>电话：</Typography>
            <Typography variant="body1">153****5265</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{mr: 2}}>地址：</Typography>
            <Typography variant="body1">上海市，东川路800号，200240</Typography>
          </Box>
        </Box>

        {/* Hobbies */}
        <Typography variant="h4" gutterBottom sx={{mb: 2}}>
          个人爱好
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="原铁崩舟忠实爱好者！最喜欢的角色是崩坏3的格蕾修和前翼社的亚托莉！~"/>
          </ListItem>
          <ListItem>
            <ListItemText primary="现工作于上海交通大学学生网络信息管理部。"/>
          </ListItem>
          <ListItem>
            <ListItemText primary={<>看看<Link
                href="https://nimo.sjtu.edu.cn/wiki/internal-world/intelligence/nimoer/f22/#%E7%AB%A5%E6%AC%A1%E6%96%87"
                target="_blank" underline="hover">Wiki</Link></>}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="“这个世界并不美好，但我们仍愿意为世界上所有的美好而战。”"/>
          </ListItem>
        </List>
      </Container>
  );
}
