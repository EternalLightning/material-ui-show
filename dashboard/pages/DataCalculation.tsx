import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CalculateIcon from '@mui/icons-material/Calculate';

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
                    <Typography component={'h2'} variant="h6" gutterBottom>
                        计算结果
                    </Typography>
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