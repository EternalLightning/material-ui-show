import * as React from 'react';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Chip from "@mui/material/Chip";
import DateRangeIcon from '@mui/icons-material/DateRange';

export default function GetCurrentDate() {
    const [currentDate, setCurrentDate] = React.useState(dayjs().format('MMM DD, YYYY'));

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(dayjs().format('MMM DD, YYYY'));
        }, 60000); // 更新频率为每分钟一次

        return () => clearInterval(timer);
    }, []);

    return (
        <Chip
            icon={<DateRangeIcon/>}
            label={
                <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    {currentDate}
                </Typography>
            }
            variant="outlined"
            size={'medium'}
            sx={{
                backgroundColor: 'white',
                marginTop: '2px',
            }}
        />
    );
}