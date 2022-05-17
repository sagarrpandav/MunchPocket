import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import Button from "./controls/Button";
import ReceiptIcon from "@mui/icons-material/Receipt";
import React, {useEffect, useState} from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import './OrderComponent.css';
import {RestaurantCard} from "./RestaurantCard";

export const OrderComponent = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [center, setCenter] = useState({lat: 40.7546272277832, lng: -73.98699951171875});
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyBy9rUo4-_QUuR20BHpK1Lb335y4KC6ycQ'
    });

    useEffect(() => {
        (async () => {
            let res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/get_rest_details', {method: 'POST'});
            res = await res.json();
            let tmp = [];
            res.forEach(i => {
                tmp.push(i['Item']);
            });
            setRestaurants(tmp);
        })();
    }, []);
    return (
        <Grid container sx={{height: '85vh', overflowY: 'scroll'}}>
            <Grid item container sm={4} sx={{
                height: "100%",
                overflowY: "scroll"
            }}>
                {restaurants?.map(i => {
                    return (<Grid onClick={() => {
                        setCenter({lat: i.address.latitude, lng: i.address.longitude})
                    }} item sm={12} sx={{backgroundColor: 'blue', height: '16vh'}}><RestaurantCard
                        restaurant={i}/></Grid>);
                })}

            </Grid>
            <Grid item sm={8} sx={{}}>
                {isLoaded ? (
                    <GoogleMap zoom={13} center={center} mapContainerClassName='map-container'>
                        {restaurants.map(i => {
                            return (
                                <Marker position={{lat: i.address.latitude, lng: i.address.longitude}}/>
                            )
                        })}
                    </GoogleMap>
                ) : (<div>Loading ....</div>)}
            </Grid>
        </Grid>
    )
}