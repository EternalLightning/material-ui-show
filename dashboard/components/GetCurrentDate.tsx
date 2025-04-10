import * as React from 'react';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Chip from "@mui/material/Chip";
import DateRangeIcon from '@mui/icons-material/DateRange';
import Box from "@mui/material/Box";

export default function GetCurrentDate() {
    const [currentDate, setCurrentDate] = React.useState(dayjs().format('MMM DD, YYYY'));

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(dayjs().format('MMM DD, YYYY'));
        }, 60000); // 更新频率为每分钟一次

        return () => clearInterval(timer);
    }, []);

    return (
        <Box
            data-screenshot="toggle-mode"
            sx={(theme) => ({
                verticalAlign: 'bottom',
                display: 'inline-flex', alignItems: 'center',
                height: '2.25rem',
                borderRadius: (theme.vars || theme).shape.borderRadius,
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.divider,
            })}
        >
            <DateRangeIcon sx={{marginLeft: 1}}/>
            <Typography variant="body1" sx={{color: 'text.secondary', marginRight: 1}}>
                {currentDate}
            </Typography>
        </Box>

    );
}