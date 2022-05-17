import {Card, Grid} from "@mui/material";

export const RestaurantCard = ({restaurant}) => {
    return (
        <Card sx={{height: '100%'}}>
            <Grid container sx={{height: '100%'}}>
                <Grid sm={4} sx={{backgroundColor: 'red', height: '100%'}}></Grid>
                <Grid sm={8} sx={{height: '100%'}}></Grid>
            </Grid>
        </Card>

    )
};