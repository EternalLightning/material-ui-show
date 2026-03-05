import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export type StatCardProps = {
  title: string;
  value: string;
  interval: string;
  data: number[];
};


export default function StatCard({
  title,
  value,
  interval,
  data,
}: StatCardProps) {

  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Typography component="h3" variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {interval}
        </Typography>
      </CardContent>
    </Card>
  );
}
