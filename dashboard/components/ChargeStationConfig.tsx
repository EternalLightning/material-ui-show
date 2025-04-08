import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {TextField} from "@mui/material";
import * as React from "react";

export default function ChargeStationConfig(){
  const sections = [
    '充电设施位置选择',
    '充电站信息',
    '充电站充电需求',
    '拓扑设置',
    '新能源出力设置',
  ];

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {sections.map((section, index) => (
        <Box key={index} sx={{ border: '1px solid #ccc', p: 2, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            {section}
          </Typography>
          <Grid container spacing={6}>
            {[...Array(9)].map((_, i) => (
              <Grid item key={i}>
                <TextField
                    id="standard-multiline-flexible"
                    multiline
                    maxRows={6}
                    variant="standard"
                    label={`输入框 ${i + 1}`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Stack>
  );
};