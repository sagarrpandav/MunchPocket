import React, {useEffect, useState} from 'react'
import {AppBar, Toolbar, Grid, InputBase, IconButton, Badge, makeStyles, Typography} from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import Button from "./controls/Button";
import ReceiptIcon from '@mui/icons-material/Receipt';
import Input from "./controls/Input";
import { InputAdornment } from '@mui/material';
import Select from "./controls/Select";
const useStyles = theme => ({
    root: {
        backgroundColor: '#fbf6f3',
    }
});

export default function Header({user, showFilters, filterName, setFilterName, cuisine, setCuisine, price, setPrice, rating, setRating}) {

    const classes = useStyles();
    const handleInputChange = (e) => {
        console.log(e);
    }



    return (
        <AppBar position="static" sx={!showFilters ? {backgroundColor: 'transparent', zIndex: 5} : {backgroundColor: "white"}}>
            <Toolbar>
                <Grid container sx={{alignItems: "center"}}>
                    <Grid item sm={12} sx={{height: '1vh'}}/>
                    <Grid item sm={3}><Typography variant='h4' color='black'>Munch-Pocket</Typography></Grid>
                    <Grid item sm={1}></Grid>
                    {user && (<>

                        <Grid item sm={1.5}><Button><Typography sx={{fontWeight: "bold"}} variant='overline'
                                                                color='black'>My Account</Typography></Button></Grid>
                        <Grid item sm={1.5}><Button><Typography sx={{fontWeight: "bold"}} variant='overline'
                                                                color='black'>My
                            Orders</Typography></Button></Grid>
                        <Grid item sm={1}/>
                        <Grid item sm={3} sx={{display: 'flex', justifyContent: 'flex-end'}}><Button
                            startIcon={<ReceiptIcon/>} sx={{textAlign: 'center'}}><Typography
                            sx={{fontWeight: "bold"}} variant='overline' color='black'> Upload
                            Receipt</Typography></Button></Grid>
                        {showFilters && (
                            <>
                                <Grid item sm={12} sx={{height: '2vh'}}/>
                                <Grid item sm={4} sx={{}}>
                                    <Input
                                        value={filterName}
                                        onChange={(event) => {setFilterName(event.target.value)}}
                                        sx={{width: '80%'}}
                                        label="Search Restaurant"
                                        InputProps={{
                                            startAdornment: (<InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>)
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={2} sx={{}}>
                                    <Select label='Cuisine' onChange={(e) => setCuisine(e.target.value)} value={cuisine} options={[
                                        { id: '0', title: 'No Filter' },
                                        { id: '1', title: 'Development' },
                                        { id: '2', title: 'Marketing' },
                                        { id: '3', title: 'Accounting' },
                                        { id: '4', title: 'HR' },
                                    ]}/>
                                </Grid>
                                <Grid item sm={2} sx={{}}>
                                    <Select label='Price' onChange={(e) => setPrice(e.target.value)} value={price} options={[
                                        { id: '0', title: 'No Filter' },
                                        { id: '1', title: '$' },
                                        { id: '2', title: '$$' },
                                        { id: '3', title: '$$$' },
                                        { id: '4', title: '$$$$' },
                                    ]}/>
                                </Grid>
                                <Grid item sm={2} sx={{}}>
                                    <Select label='Rating' onChange={(e) => setRating(e.target.value)} value={rating} options={[
                                        { id: '0', title: 'No Filter' },
                                        { id: '1', title: '☆' },
                                        { id: '2', title: '☆☆' },
                                        { id: '3', title: '☆☆☆' },
                                        { id: '4', title: '☆☆☆☆' },
                                    ]}/>
                                </Grid>
                                <Grid item sm={2} sx={{}}>
                                    <Button text='Filter'/>
                                </Grid>
                                <Grid item sm={12} sx={{height: '2vh'}}/>
                            </>
                        )}
                    </>)}
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
