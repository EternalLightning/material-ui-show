import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CalculateIcon from '@mui/icons-material/Calculate';
import Grid from "@mui/material/Grid";

const cards = [
    {
        id: 1,
        title: '方案1',
        description:
            <>
                网络名称: IEEE33<br/>
                支路数量: 32<br/>
                充电站数量: 1
            </>,
    },
    {
        id: 2,
        title: '方案2',
        description: '方案2描述',
    },
    {
        id: 3,
        title: '方案3',
        description: '方案3描述',
    },
];

export default function DataCalculation() {

    const [selectedCard, setSelectedCard] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(<></>);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (selectedCard === 0) {
                setMessage(
                    <>
                        <Typography component={'h2'} variant="h6" gutterBottom>
                            成本计算结果
                        </Typography>
                        <Card variant="outlined" sx={{marginBottom: 3, height: '100%', flexGrow: 1}}>
                            <Typography variant="body1" gutterBottom>
                                总运行成本为 10000 元，其中投资成本为 5000 元，运行成本为 5000 元。
                            </Typography>
                        </Card>
                        <Typography component={'h2'} variant="h6" gutterBottom>
                            优化配置结果
                        </Typography>
                        <Grid container spacing={2} columns={12}>
                            <Grid size={{xs: 12, md: 6, lg: 6, xl: 3}}>
                                <Card variant="outlined" sx={{marginBottom: 3, height: '100%', flexGrow: 1}}>
                                    <Typography component="h1" variant="subtitle1" gutterBottom>
                                        变压器
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        容量: 100MVA<br/>
                                        数量: 2
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid size={{xs: 12, md: 6, lg: 6, xl: 3}}>
                                <Card variant="outlined" sx={{marginBottom: 3, height: '100%', flexGrow: 1}}>
                                    <Typography component="h1" variant="subtitle1" gutterBottom>
                                        风光储新能源出力
                                    </Typography>
                                    <Grid container spacing={2} columns={3}>
                                        <Grid size={{xs: 1}}>
                                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                                风电
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                容量: 100MVA<br/>
                                                数量: 2
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs: 1}}>
                                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                                光伏
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                容量: 100MVA<br/>
                                                数量: 2
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs: 1}}>
                                            <Typography component="h1" variant="subtitle1" gutterBottom>
                                                储能
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                容量: 100MVA<br/>
                                                数量: 2
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid size={{xs: 12, md: 6, lg: 6, xl: 3}}>
                                <Card variant="outlined" sx={{marginBottom: 3, height: '100%', flexGrow: 1}}>
                                    <Typography component="h1" variant="subtitle1" gutterBottom>
                                        V2G桩
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        容量: 100MVA<br/>
                                        数量: 2
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid size={{xs: 12, md: 6, lg: 6, xl: 3}}>
                                <Card variant="outlined" sx={{marginBottom: 3, height: '100%', flexGrow: 1}}>
                                    <Typography component="h1" variant="subtitle1" gutterBottom>
                                        超充站与快充站
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        容量: 100MVA<br/>
                                        数量: 2
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                );
            } else if (selectedCard === 1) {
                setMessage(
                    <Typography component={'h2'} variant="h6" gutterBottom>
                        计算结果
                    </Typography>
                );
            } else if (selectedCard === 2) {
                setMessage(
                    <Typography component={'h2'} variant="h6" gutterBottom>
                        计算结果
                    </Typography>
                );
            }
        }, 700);
    };

    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1900px'}}}>
            <Typography component={'h2'} variant="h6" gutterBottom>
                选择方案
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    gap: 2,
                }}
            >
                {cards.map((card, index) => (
                    <Card variant={'outlined'} sx={{
                        width: '100%',
                        borderRadius: 1,
                        maxWidth: {sm: '100%', md: '475px'},
                        padding: 0
                    }}>
                        <CardActionArea
                            onClick={() => setSelectedCard(index)}
                            data-active={selectedCard === index ? '' : undefined}
                            sx={{
                                height: '100%',
                                '&[data-active]': {
                                    backgroundColor: 'rgba(0,0,0,0.08)',
                                    '&:hover': {
                                        backgroundColor: 'action.selectedHover',
                                    },
                                },
                            }}
                        >
                            <CardContent sx={{height: '100%', margin: 2.5}}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {card.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}

            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 5,
            }}>
                <Button
                    variant="contained"
                    color={'info'}
                    size={'large'}
                    startIcon={<CalculateIcon/>}
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? '计算中...' : '开始计算'}
                </Button>
            </Box>
            {message && <p>{message}</p>}
        </Box>
    );
};