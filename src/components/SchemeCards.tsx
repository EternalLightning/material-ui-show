import {cards} from "../data/cards";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";


const SchemeCards = () => {
    return (
        <Grid container spacing={2} columns={12}>
            {cards.map((card, index) => (
                <Grid size={{xs: 12, md: 6, lg: 6, xl: 3}}>
                    <Card variant={'outlined'} sx={{
                        width: '100%',
                        borderRadius: 1,
                        padding: 0
                    }}>
                        <CardActionArea>
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
                </Grid>
            ))}
        </Grid>
    )
}

export default SchemeCards;