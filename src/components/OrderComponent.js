import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import Button from "./controls/Button";
import ReceiptIcon from "@mui/icons-material/Receipt";
import React, {useEffect, useState} from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import './OrderComponent.css';
import {RestaurantCard} from "./RestaurantCard";
import Popup from "./Popup";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

const allCuisines = [{"id": -1, title: 'No Filter'},{"id":0,"title":"Pizza"},{"id":1,"title":"American"},{"id":2,"title":"Drinks"},{"id":3,"title":"Italian"},{"id":4,"title":"Korean"},{"id":5,"title":"Brunch"},{"id":6,"title":"Japanese"},{"id":7,"title":"Asian"},{"id":8,"title":"Chinese"},{"id":9,"title":"Vegan / Vegetarian"},{"id":10,"title":"Greek"},{"id":11,"title":"Small Plates (inactive)"},{"id":12,"title":"Latin American"},{"id":13,"title":"Mediterranean"},{"id":14,"title":"Seafood"},{"id":15,"title":"Kosher"},{"id":16,"title":"Mexican"},{"id":17,"title":"Spanish / Tapas (inactive)"},{"id":18,"title":"Burgers"},{"id":19,"title":"Indian"},{"id":20,"title":"Sushi"},{"id":21,"title":"Thai"},{"id":22,"title":"Ramen"},{"id":23,"title":"Contemporary"},{"id":24,"title":"French"},{"id":25,"title":"Beer"},{"id":26,"title":"Traditional"},{"id":27,"title":"Vegetarian "},{"id":28,"title":"European (inactive)"},{"id":29,"title":"BBQ"},{"id":30,"title":"Spanish"}];

export const OrderComponent = ({filterName, rating, price, cuisine, reefetch, setReefetch, user}) => {
    const [restaurants, setRestaurants] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [zoom, setZoom] = useState(15);
    const [offset, setOffset] = useState(0);
    const [center, setCenter] = useState({lat: 40.7546272277832, lng: -73.98699951171875});
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyBy9rUo4-_QUuR20BHpK1Lb335y4KC6ycQ'
    });
    const [selectedRestaurant, setSelectedRestaurant] = useState({});

    const placeOrder = async (restaurant) => {
        let tmp = {
            "user_id": user.id,
            "rest_id": restaurant.id,
            "date_planned": new Date().toDateString(),
            "time_planned": new Date().toLocaleTimeString(),
            mode: 'dinein',
            rest_percent: 5
        };
        await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/order_mode', {method: 'POST', body: JSON.stringify(tmp)});

    }

    useEffect(() => {
        (async () => {
            let res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/get_rest_details', {
                method: 'POST',
                body: JSON.stringify({
                    offset: offset,
                    name: filterName,
                    cuisine: cuisine != -1 ? allCuisines.filter(i => i.id == cuisine)[0].title : '',
                    priceRating: price != 0 ? price : '',
                    rating: rating != 0 ? rating : ''
                })
            });
            res = await res.json();
            let tmp = [];
            res.forEach(i => {
                tmp.push(i['Item']);
            });
            setRestaurants(tmp);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/get_rest_details', {
                method: 'POST',
                body: JSON.stringify({
                    offset: reefetch ? 0 : offset,
                    name: filterName,
                    cuisine: cuisine != -1 ? allCuisines.filter(i => i.id == cuisine)[0].title : '',
                    priceRating: price != 0 ? price : '',
                    rating: rating != 0 ? rating : ''
                })
            });
            res = await res.json();
            let tmp = [];
            res.forEach(i => {
                tmp.push(i['Item']);
            });
            setReefetch(false);
            setRestaurants(reefetch ? [...tmp] : [...restaurants, ...tmp]);
            setReefetch(false);
        })();
    }, [offset]);

    useEffect(() => {
        (async () => {
            if (reefetch) {
                let res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/get_rest_details', {
                    method: 'POST',
                    body: JSON.stringify({
                        offset: 0,
                        name: filterName,
                        cuisine: cuisine != -1 ? allCuisines.filter(i => i.id == cuisine)[0].title : '',
                        priceRating: price != 0 ? price : '',
                        rating: rating != 0 ? rating : ''
                    })
                });
                res = await res.json();
                let tmp = [];
                res.forEach(i => {
                    tmp.push(i['Item']);
                });
                setReefetch(false);
                setRestaurants(reefetch ? [...tmp] : [...restaurants, ...tmp]);
                setReefetch(false);
            }
        })();
    }, [reefetch])
    return (
        <Grid container sx={{height: '80vh', overflowY: 'scroll'}}>
            <Grid item sm={12} sx={{height: "0.01vh"}}/>
            <Grid item container sm={4} sx={{
                height: "100%",
                overflowY: "scroll"
            }}>
                {restaurants?.map(i => {
                    return (<Grid onClick={() => {
                        setCenter({lat: i.address.latitude, lng: i.address.longitude});
                        setZoom(20);
                    }} item sm={12} sx={{backgroundColor: 'blue', height: '22vh'}}><RestaurantCard
                        restaurant={i} selectRestaurant={setSelectedRestaurant} showPopUp={setShowPopUp}/></Grid>);
                })}
                <Button text="Show More" onClick={() => {
                    setOffset(offset + 10)
                }}/>

            </Grid>
            <Grid item sm={8} sx={{}}>
                {isLoaded ? (
                    <GoogleMap zoom={zoom} center={center} mapContainerClassName='map-container'>
                        {restaurants.map(i => {
                            return (
                                <Marker onClick={() => {
                                    setSelectedRestaurant(i);
                                    setShowPopUp(true);
                                }} sx={{backgroundColor: 'blue'}}
                                        position={{lat: i.address.latitude, lng: i.address.longitude}}/>
                            )
                        })}
                    </GoogleMap>
                ) : (<div>Loading ....</div>)}
            </Grid>
            {selectedRestaurant?.name && <Popup title={selectedRestaurant?.name}
                                                openPopup={showPopUp}
                                                setOpenPopup={setShowPopUp}>
                <div style={{height: '40vh', display: "flex", flexDirection: "row"}}>

                    {selectedRestaurant?.images.map(i => (<img src={i.url}/>))}
                </div>
                <hr/>
                <div>
                    <Typography variant='h6'>The Scoop</Typography>
                    <Typography variant='body4'>{selectedRestaurant.description}</Typography>
                </div>
                <hr/>
                <div style={{display: "flex", flexDirection: "row", justifyContent: 'space-between'}}>
                    <div style={{cursor: "pointer"}} onClick={() => {
                        window.open("https://www.google.com/maps/dir//" + selectedRestaurant.address.latitude + "," + selectedRestaurant.address.longitude, '_blank');
                    }}>
                        <img src='https://d2o6c6evk5zqsg.cloudfront.net/images/webp/search/pin-icon.webp'/> Get
                        Directions
                    </div>
                    <div style={{cursor: "pointer"}} onClick={() => {
                        window.open(selectedRestaurant.menuUrl, '_blank');
                    }}>
                        <img
                            src="https://d2o6c6evk5zqsg.cloudfront.net/images/webp/search/menu-icon.webp"/> View Menu
                    </div>
                    <div style={{cursor: "pointer"}} onClick={async () => {
                        await placeOrder(selectedRestaurant);
                        window.open(selectedRestaurant.orderUrl, '_blank');
                    }}>
                        <DeliveryDiningIcon/> Order Now
                    </div>
                </div>
            </Popup>}
        </Grid>
    )
}