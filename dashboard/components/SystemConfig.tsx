import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import FormControl from "@mui/material/FormControl";

export default function SystemConfig() {
    const sections = [
        '基准值设置',
        '优化器设置',
        '时段数量设置',
        '结果输出设置',
    ];

    return (
        <Stack spacing={2} sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            {sections.map((section, index) => (
                <Box key={index} sx={{border: '1px solid #ccc', p: 2, borderRadius: 1}}>
                    <Typography variant="h6" gutterBottom>
                        {section}
                    </Typography>
                    <Grid container spacing={6}>
                        {index === 0 && (
                            // 基准值设置
                            <>
                                <Grid size={{xs: 2}}>
                                    <TextField
                                        label="基准容量"
                                        id="base-capacity"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid size={{xs: 2}}>
                                    <TextField
                                        label="基准电压"
                                        id="base-voltage"
                                        variant="standard"
                                    />
                                </Grid>
                            </>
                        )}
                        {index === 1 && (
                            // 优化器设置
                            <>
                                <Grid size={{xs: 2}} sx={{marginTop: 0.67, marginBottom: -0.67}}>
                                    <ThemeProvider theme={createTheme()}>
                                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                            <Select
                                                labelId="solver-select-label"
                                                id="solver-select"
                                                defaultValue="cplex"

                                            >
                                                <MenuItem value="cplex">CPLEX</MenuItem>
                                                <MenuItem value="gurobi">Gurobi</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </ThemeProvider>
                                </Grid>
                                <Grid size={{xs: 2}}>
                                    <TextField
                                        label="最大求解时间（秒）"
                                        id="max-solve-time"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid size={{xs: 2}}>
                                    <TextField
                                        label="收敛容差"
                                        id="convergence-tolerance"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid size={{xs: 2}} sx={{marginTop: 0.67, marginBottom: -0.67}}>
                                    <ThemeProvider theme={createTheme()}>
                                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                            <Select
                                                labelId="display-details-label"
                                                id="display-details"
                                                defaultValue="0"
                                            >
                                                <MenuItem value="0">不显示</MenuItem>
                                                <MenuItem value="1">少量</MenuItem>
                                                <MenuItem value="2">正常</MenuItem>
                                                <MenuItem value="3">详细</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </ThemeProvider>
                                </Grid>
                            </>
                        )}
                        {index === 2 && (
                            // 时段数量设置
                            <Grid size={{xs: 2}} sx={{marginTop: 0.67, marginBottom: -0.67}}>
                                <ThemeProvider theme={createTheme()}>
                                    <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                        <Select
                                            labelId="time-period-select-label"
                                            id="time-period-select"
                                            defaultValue="1"
                                        >
                                            <MenuItem value="1">1</MenuItem>
                                            <MenuItem value="24">24</MenuItem>
                                        </Select>
                                    </FormControl>
                                </ThemeProvider>
                            </Grid>
                        )}
                        {index === 3 && (
                            // 结果输出设置
                            <>
                                <Grid size={{xs: 2}} sx={{marginTop: 1, marginBottom: -1}}>
                                    <FormControlLabel
                                        control={<Switch/>}
                                        label="保存结果到文件"
                                    />
                                </Grid>
                                <Grid size={{xs: 2}}>
                                    <TextField
                                        label="结果保存路径"
                                        id="result-save-path"
                                        variant="standard"
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Box>
            ))}
        </Stack>
    );
}