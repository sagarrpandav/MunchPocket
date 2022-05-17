import {Card, Grid, Typography} from "@mui/material";
import Button from "./controls/Button";

export const RestaurantCard = ({restaurant, selectRestaurant, showPopUp}) => {
    return (
        <Card sx={{height: '100%'}}>
            <Grid container sx={{ backgroundColor: "#fffdfa",height: '100%'}}>
                <Grid item sm={4.75} sx={{height: '100%'}}>
                    <img style={{height:'22vh', width: '22vh', 'margin': '1%'}} src={restaurant.images[0].url}></img>
                </Grid>
                <Grid item container sm={7.25} sx={{height: '100%'}}>
                    <Grid item sm={12}>
                        <Typography variant='h6'>{restaurant.name}</Typography>
                    </Grid>
                    <Grid item sm={12}>
                        {restaurant.rating && Array(Math.floor(restaurant.rating)).fill().map(i => {
                            return <img style={{width: '12px', margin: '2px'}} src='https://d2o6c6evk5zqsg.cloudfront.net/images/webp/search/yelp-star-lit.webp'></img>
                        })}
                        {restaurant.rating%1 != 0 ? (<img style={{width: '12px', margin: '2px'}} src='https://d2o6c6evk5zqsg.cloudfront.net/images/webp/search/yelp-star-half.webp'></img>) :  (<></>)}
                        <img style={{width: '25px', margin: '2px'}} src='https://d2o6c6evk5zqsg.cloudfront.net/images/webp/search/yelp-logo.webp'></img>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant='overline'>{restaurant.priceRating && Array(restaurant.priceRating).fill().map(i => ('$'))} | {restaurant.cuisines.map(i => i+ ',')}</Typography>
                    </Grid>

                    <Grid item sm={12}>
                        <Button onClick={() => {selectRestaurant(restaurant); showPopUp(true);}} sx={{backgroundColor: '#3a363d'}} text='View Details'/>
                    </Grid>
                </Grid>
            </Grid>
        </Card>

    )
};