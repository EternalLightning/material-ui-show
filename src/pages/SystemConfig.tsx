import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import {Box, InputLabel} from "@mui/material";
import Card from "@mui/material/Card";

export default function SystemConfig() {
    return (
        <Box sx={{width: '80%', maxWidth: {sm: '100%', md: '1900px'}}}>
            <Typography variant="h6" gutterBottom>
                基准值设置
            </Typography>
            <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                <Grid container columns={8}>
                    <Grid size={{xs: 2}}>
                        <TextField
                            label="基准容量(MVA)"
                            id="base-capacity"
                            variant="standard"
                            defaultValue="10"
                        />
                    </Grid>
                    <Grid size={{xs: 2}}>
                        <TextField
                            label="基准电压(kV)"
                            id="base-voltage"
                            variant="standard"
                            defaultValue="12.66"
                        />
                    </Grid>
                </Grid>
            </Card>
            <Typography variant="h6" gutterBottom>
                优化器设置
            </Typography>
            <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                <Grid container columns={8}>
                    <Grid size={{xs: 2}}>
                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                求解器
                            </InputLabel>
                            <Select
                                labelId="solver-select-label"
                                id="solver-select"
                                defaultValue="cplex"
                            >
                                <MenuItem value="cplex">CPLEX</MenuItem>
                                <MenuItem value="gurobi">Gurobi</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 2}} sx={{marginTop: 1.26, marginBottom: -1.26}}>
                        <TextField
                            label="最大求解时间（秒）"
                            id="max-solve-time"
                            variant="standard"
                            defaultValue="3600"
                        />
                    </Grid>
                    <Grid size={{xs: 2}} sx={{marginTop: 1.26, marginBottom: -1.26}}>
                        <TextField
                            label="收敛容差"
                            id="convergence-tolerance"
                            variant="standard"
                            defaultValue="1e-3"
                        />
                    </Grid>
                    <Grid size={{xs: 2}}>
                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                求解细节显示
                            </InputLabel>
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
                    </Grid>
                </Grid>
            </Card>
            <Typography variant="h6" gutterBottom>
                结果输出设置
            </Typography>
            <Card variant="outlined" sx={{width: '100%', marginBottom: 3}}>
                <Grid container columns={8}>
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
                </Grid>
            </Card>
        </Box>
    )
}