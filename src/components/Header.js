import React, {useEffect, useState} from 'react'
import {
    AppBar,
    Toolbar,
    Grid,
    InputBase,
    IconButton,
    Badge,
    makeStyles,
    Typography,
    InputLabel,
    OutlinedInput,
    FormControl,
    Paper
} from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import Button from "./controls/Button";
import ReceiptIcon from '@mui/icons-material/Receipt';
import Input from "./controls/Input";
import {InputAdornment} from '@mui/material';
import Select from "./controls/Select";
import Popup from "./Popup";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const useStyles = theme => ({
    root: {
        backgroundColor: '#fbf6f3',
    }
});

const allCuisines = [{"id": -1, title: 'No Filter'}, {"id": 0, "title": "Pizza"}, {
    "id": 1,
    "title": "American"
}, {"id": 2, "title": "Drinks"}, {"id": 3, "title": "Italian"}, {"id": 4, "title": "Korean"}, {
    "id": 5,
    "title": "Brunch"
}, {"id": 6, "title": "Japanese"}, {"id": 7, "title": "Asian"}, {"id": 8, "title": "Chinese"}, {
    "id": 9,
    "title": "Vegan / Vegetarian"
}, {"id": 10, "title": "Greek"}, {"id": 11, "title": "Small Plates (inactive)"}, {
    "id": 12,
    "title": "Latin American"
}, {"id": 13, "title": "Mediterranean"}, {"id": 14, "title": "Seafood"}, {"id": 15, "title": "Kosher"}, {
    "id": 16,
    "title": "Mexican"
}, {"id": 17, "title": "Spanish / Tapas (inactive)"}, {"id": 18, "title": "Burgers"}, {
    "id": 19,
    "title": "Indian"
}, {"id": 20, "title": "Sushi"}, {"id": 21, "title": "Thai"}, {"id": 22, "title": "Ramen"}, {
    "id": 23,
    "title": "Contemporary"
}, {"id": 24, "title": "French"}, {"id": 25, "title": "Beer"}, {"id": 26, "title": "Traditional"}, {
    "id": 27,
    "title": "Vegetarian "
}, {"id": 28, "title": "European (inactive)"}, {"id": 29, "title": "BBQ"}, {"id": 30, "title": "Spanish"}];

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Header({
                                   user,
                                    setUser,
                                   showFilters,
                                   filterName,
                                   setFilterName,
                                   cuisine,
                                   setCuisine,
                                   price,
                                   setPrice,
                                   rating,
                                   setRating,
                                   setReefetch,
                                   setShowMap,
                                   setShowFilters
                               }) {

    const classes = useStyles();
    const handleInputChange = (e) => {
        console.log(e);
    }

    const [openAccount, setOpenAccount] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const [openRedeem, setOpenRedeem] = useState(false);
    const [freshUser, setFreshUser] = useState(null);
    const [redeemValue, setRedeemValue] = useState(0);
    const [redeemSuccess, setRedeemSuccess] = useState(false);
    const [base64Str, setStr] = useState('');
    const [receiptMessage, setReceiptMessage] = useState('');

    useEffect(() => {
        (async () => {
            let res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/get_user_details?user_id=' + user.user_id, {method: 'GET'});
            res = await res.json();
            setFreshUser(res.user[0]);
        })();
    }, [openAccount]);

    return (
        <AppBar position="static" sx={!showFilters ? {
            backgroundColor: 'transparent',
            zIndex: "5, 0 .5rem 1rem rgba(0,0,0,.15)!important"
        } : {backgroundColor: "#fffdfa", zIndex: "0 .5rem 1rem rgba(0,0,0,.15)!important"}}>
            <Toolbar>
                <Grid container sx={{alignItems: "center"}}>
                    <Grid item sm={12} sx={{height: '1vh'}}/>
                    <Grid item sm={3}><Typography variant='h4' color='black' onClick={() => {
                        setShowMap(false);
                        setShowFilters(false);
                    }}>Munch-Pocket</Typography></Grid>
                    <Grid item sm={1}></Grid>
                    {user && (<>

                        <Grid item sm={1.5}><Button onClick={() => setOpenAccount(true)}
                                                    sx={{backgroundColor: '#fbd867'}}><Typography
                            sx={{fontWeight: "bold"}} variant='overline'
                            color='black'>My Account</Typography></Button></Grid>
                        <Grid item sm={1.5}><Button onClick={() => setOpenOrder(true)}
                                                    sx={{backgroundColor: '#fbd867'}}><Typography
                            sx={{fontWeight: "bold"}} variant='overline'
                            color='black'>My
                            Orders</Typography></Button></Grid>
                        <Grid item sm={1}/>
                        <Grid item sm={3} sx={{display: 'flex', justifyContent: 'flex-end'}}><Button
                            onClick={() => setOpenRedeem(true)}
                            startIcon={<ReceiptIcon/>}
                            sx={{backgroundColor: '#fbd867', textAlign: 'center'}}><Typography
                            sx={{fontWeight: "bold"}} variant='overline' color='black'> Upload
                            Receipt</Typography></Button></Grid>
                        <Grid item sm={1}>
                            <Button
                                onClick={() => {
                                    sessionStorage.removeItem('user');
                                    setUser(null);
                                }}
                                sx={{backgroundColor: '#fbd867', textAlign: 'center'}}><Typography
                                sx={{fontWeight: "bold"}} variant='overline' color='black'> Log
                                Out </Typography></Button></Grid>

                        {showFilters && (
                            <>
                                <Grid item sm={12} sx={{height: '2vh'}}/>
                                <Grid item sm={4} sx={{}}>
                                    <Input
                                        value={filterName}
                                        onChange={(event) => {
                                            setFilterName(event.target.value)
                                        }}
                                        sx={{width: '80%'}}
                                        label="Search Restaurant"
                                        InputProps={{
                                            startAdornment: (<InputAdornment position="start">
                                                <SearchIcon/>
                                            </InputAdornment>)
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={2} sx={{}}>
                                    <Select label='Cuisine' onChange={(e) => setCuisine(e.target.value)} value={cuisine}
                                            options={allCuisines}/>
                                </Grid>
                                <Grid item sm={2} sx={{}}>
                                    <Select label='Price' onChange={(e) => setPrice(e.target.value)} value={price}
                                            options={[
                                                {id: '0', title: 'No Filter'},
                                                {id: '1', title: '$'},
                                                {id: '2', title: '$$'},
                                                {id: '3', title: '$$$'},
                                                {id: '4', title: '$$$$'},
                                            ]}/>
                                </Grid>
                                <Grid item sm={2} sx={{}}>
                                    <Select label='Rating' onChange={(e) => setRating(e.target.value)} value={rating}
                                            options={[
                                                {id: '0', title: 'No Filter'},
                                                {id: '1', title: '☆'},
                                                {id: '2', title: '☆☆'},
                                                {id: '3', title: '☆☆☆'},
                                                {id: '4', title: '☆☆☆☆'},
                                            ]}/>
                                </Grid>
                                <Grid item sm={2} sx={{}}>
                                    <Button sx={{backgroundColor: '#fbd867', color: 'black'}} text='Filter'
                                            onClick={() => {
                                                setReefetch(true);
                                            }}/>
                                </Grid>
                                <Grid item sm={12} sx={{height: '2vh'}}/>
                            </>
                        )}
                    </>)}
                </Grid>
            </Toolbar>
            {freshUser && <Popup openPopup={openAccount} setOpenPopup={setOpenAccount} title='My Account'>
                <Grid container sx={{alignItems: 'center'}}>
                    <Grid item sm={6}>
                        <Typography variant='h4'>{freshUser.first_name} {freshUser.last_name}</Typography>
                        <Typography variant='caption'>{freshUser.email}</Typography>
                    </Grid>
                    <Grid item sm={6}>
                        <div style={{display: "flex", justifyContent: 'flex-end', alignItems: 'center'}}>
                            <AccountBalanceWalletIcon sx={{color: '#fbd867', fontSize: '10vh'}}/>
                            <Typography variant='h1'>{freshUser.wallet}</Typography>
                        </div>
                    </Grid>
                    <Grid item sm={12}>
                        <div style={{display: "flex", justifyContent: "space-around"}}>
                            <Input
                                sx={{width: '50%'}}
                                id="outlined-adornment-amount"
                                value={redeemValue}
                                type='number'
                                onChange={(e) => {
                                    setRedeemValue(e.target.value)
                                }}
                                label="Amount"
                            />
                            <Button onClick={async () => {
                                let res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/redeem_rewards', {
                                    method: 'POST', body: JSON.stringify({
                                        user_id: user.user_id,
                                        redeem_amount: parseInt(redeemValue)
                                    })
                                });
                                res = await res.json();
                                res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/get_user_details?user_id=' + user.user_id, {method: 'GET'});
                                res = await res.json();
                                setFreshUser(res.user[0]);
                                setRedeemSuccess(true);
                                await timeout(5000);
                                setRedeemSuccess(false);

                            }} disabled={redeemValue == 0 || redeemValue > freshUser.wallet}
                                    sx={{backgroundColor: '#fbd867', color: 'black'}} text='Redeem'/>
                        </div>
                    </Grid>
                    {redeemSuccess && <Grid item sm={12} sx={{display: "flex", justifyContent: 'center'}}>
                        <Typography sx={{color: 'orange'}} variant='overline'>An Email has been sent with your coupon
                            !</Typography>
                    </Grid>}
                </Grid>
            </Popup>}
            <Popup openPopup={openOrder} setOpenPopup={setOpenOrder} title='My Orders'>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Time</TableCell>
                                <TableCell align="right">Restaurant ID</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Reward</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[]?.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Popup>
            <Popup openPopup={openRedeem} setOpenPopup={setOpenRedeem} title='Upload Receipt'>
                <div>
                    <label htmlFor="icon-button-file">
                        <Input sx={{display: 'none'}} accept="image/*" id="icon-button-file" type="file"
                               onChange={(e) => {
                                   var reader = new FileReader();
                                   reader.readAsDataURL(e.target.files[0]);
                                   reader.onload = function () {
                                       setStr(reader.result.replace('data:', '')
                                           .replace(/^.+,/, ''));
                                   };
                                   reader.onerror = function (error) {
                                       console.log('Error: ', error);
                                   };
                               }}/>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera sx={{color: '#fbd867', fontSize: '15vh'}}/>
                        </IconButton>
                        <Button text='Submit Reciept' onClick={async () => {
                            let res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/upload_receipt', {
                                method: 'POST',
                                body: JSON.stringify({file: base64Str})
                            });
                            res = await res.json();
                            res = JSON.parse(res.body);
                            res = {
                                mode: 'upload',
                                total: parseInt(res.Total),
                                order_id: parseInt(res['Order Id'])
                            };
                            res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/order_mode', {
                                method: 'POST',
                                body: JSON.stringify(res)
                            });
                            res = await res.json();
                            res = JSON.parse(res['body']);
                            setReceiptMessage(res);
                            await timeout(5000);
                            setReceiptMessage('');
                        }}/>
                    </label>
                    <div>
                        {receiptMessage != '' &&
                        <Typography sx={{color: 'orange'}} variant='overline'>
                            {JSON.stringify(receiptMessage)}</Typography>}
                    </div>
                </div>
            </Popup>
        </AppBar>
    )
}
