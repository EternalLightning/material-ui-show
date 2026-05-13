import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CalculateIcon from '@mui/icons-material/Calculate';
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorRetryPanel from '../components/ErrorRetryPanel';
import {usePlans} from '../hooks/usePlans';

export default function DataCalculation() {

    const [selectedCard, setSelectedCard] = React.useState(0);
    const {plans, loading: plansLoading, error: plansError, reload: reloadPlans} = usePlans();
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(<></>);

    React.useEffect(() => {
        reloadPlans();
    }, [reloadPlans]);

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
                                总运行成本为 75947.13 元，其中投资成本为 2477.18 元，运行成本为 73469.95 元。
                            </Typography>
                        </Card>
                        <Typography component={'h2'} variant="h6" gutterBottom>
                            优化配置结果
                        </Typography>
                        <Card variant="outlined" sx={{marginBottom: 3, height: '100%', flexGrow: 1}}>
                            <Typography component={'h3'} variant="h6" gutterBottom>
                                风机配置结果
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 9</Typography>
                                            <Typography variant="body1">配置容量: 226.71 kVA</Typography>
                                            <Typography variant="body1">数量: 1</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 14</Typography>
                                            <Typography variant="body1">配置容量: 417.57 kVA</Typography>
                                            <Typography variant="body1">数量: 1</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 29</Typography>
                                            <Typography variant="body1">配置容量: 539.67 kVA</Typography>
                                            <Typography variant="body1">数量: 1</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Typography component={'h3'} variant="h6" gutterBottom>
                                光伏配置结果
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 4</Typography>
                                            <Typography variant="body1">配置容量: 400 kWp</Typography>
                                            <Typography variant="body1">数量: 1</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 19</Typography>
                                            <Typography variant="body1">配置容量: 400 kWp</Typography>
                                            <Typography variant="body1">数量: 1</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 23</Typography>
                                            <Typography variant="body1">配置容量: 400 kWp</Typography>
                                            <Typography variant="body1">数量: 1</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Typography component={'h3'} variant="h6" gutterBottom>
                                储能电站配置结果
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 6</Typography>
                                            <Typography variant="body1">配置容量: 0 kVA</Typography>
                                            <Typography variant="body1">数量: 0</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Typography component={'h3'} variant="h6" gutterBottom>
                                智能软开关配置结果
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 8-21</Typography>
                                            <Typography variant="body1">配置容量: 0 kVA</Typography>
                                            <Typography variant="body1">数量: 0</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 12-22</Typography>
                                            <Typography variant="body1">配置容量: 0 kVA</Typography>
                                            <Typography variant="body1">数量: 0</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 9-15</Typography>
                                            <Typography variant="body1">配置容量: 0 kVA</Typography>
                                            <Typography variant="body1">数量: 0</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 18-33</Typography>
                                            <Typography variant="body1">配置容量: 0 kVA</Typography>
                                            <Typography variant="body1">数量: 0</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" sx={{marginBottom: 1}}>
                                        <CardContent>
                                            <Typography variant="body1">节点编号: 25-29</Typography>
                                            <Typography variant="body1">配置容量: 0 kVA</Typography>
                                            <Typography variant="body1">数量: 0</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Card>
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
        }, 1600);
    };

    return (
        <Box sx={{width: '80%', maxWidth: {sm: '100%', md: '1900px'}}}>
            <Typography component={'h2'} variant="h6" gutterBottom>
                选择方案
            </Typography>
            {/* plans 加载/错误处理 */}
            {plansLoading ? (
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120}}>
                    <CircularProgress/>
                </Box>
            ) : plansError ? (
                <Box sx={{p: 2}}>
                    <ErrorRetryPanel message={plansError} onRetry={reloadPlans}/>
                </Box>
            ) : (
                <Grid container spacing={2} columns={12}>
                    {plans?.map((card, index) => (
                        <Grid size={{xs: 12, md: 6, lg: 6, xl: 3}} key={card.title + index}>
                            <Card variant={'outlined'} sx={{width: '100%', borderRadius: 1, padding: 0}}>
                                <CardActionArea
                                    onClick={() => setSelectedCard(index)}
                                    data-active={selectedCard === index ? '' : undefined}
                                    sx={{
                                        height: '100%',
                                        '&[data-active]': {
                                            backgroundColor: 'rgba(0,0,0,0.08)',
                                            '&:hover': {backgroundColor: 'action.selectedHover'},
                                        },
                                    }}
                                >
                                    <CardContent sx={{height: '100%', margin: 2.5}}>
                                        <Typography variant="h5" component="h2" gutterBottom>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {card.description ?? (card.filename ?? '无文件')}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
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
                    {loading ? '计算中' : '开始计算'}
                    {loading && <CircularProgress size={20} sx={{ml: 1}}/>}
                </Button>
            </Box>
            {message && <p>{message}</p>}
        </Box>
    );
};