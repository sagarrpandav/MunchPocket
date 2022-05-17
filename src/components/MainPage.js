import {Box, Grid, Tab, Tabs, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import Select from "./controls/Select";
import DadtePicker from "./controls/DatePicker";
import TimePicker from "./controls/TimePicker";
import Button from "./controls/Button";
import Input from "./controls/Input";
import {OrderComponent} from "./OrderComponent";


const oneToTen = () => {
    let op = [];
    for (let i = 1; i <= 10; i++) {
        op.push({id: i, title: i});
    }
    return op;
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const MainPage = ({user, setShowFilters}) => {
    const [value, setValue] = React.useState(0);
    const [showMap, setShowMap] = useState(false);
    const [myLocation, setMyLocation] = useState(null);
    const [people, setPeople] = useState(0);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [openPopup, setOpenPopup] = React.useState(false);
    const [updateQues, setUpdateQues] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [userQuestions, setUserQuestions] = useState([]);
    const [likes, setLikes] = useState([]);
    const [filterClause, setFilterClause] = useState('');
    const [categories, setCategories] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            {!showMap ? (<Grid container>
                <Grid item sm={6.5}>
                    <img style={{}} src='https://d2o6c6evk5zqsg.cloudfront.net/images/webp/home/Soba_Isolated.webp'/>
                </Grid>
                <Grid item sm={5.5} sx={{
                    display: "flex",
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flexDirection: "column"
                }}>
                    <Typography variant='h3' sx={{marginTop: '10vh'}}>Earn Rewards for Reservation, Takeout and
                        Delivery</Typography>
                    <Typography variant='h6' sx={{color: 'gray'}}>Get up to 30% back every time from the best
                        restaurants in town.</Typography>
                    <br/>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Dine In" {...a11yProps(0)} />
                                <Tab label="Delivery" {...a11yProps(1)} />
                                <Tab label="Pickup" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                <Select sx={{width: '5vw'}} label='People' value={people} onChange={(val) => setPeople(val.target.value)} options={oneToTen()}/>
                                <DadtePicker value={date} onChange={(val) => setDate(val.target.value)} label="Date"/>
                                <TimePicker value={time} onChange={(val) => setTime(val.target.name)}/>
                            </div>
                            <br/>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Button text='Browse Restaurants' onClick={() => {setShowFilters(true);setShowMap(true);}}/>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                {myLocation == null ? (<Button onClick={() => {
                                    navigator.geolocation.getCurrentPosition(pos => {
                                        console.log(pos);
                                        setMyLocation({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
                                    });
                                }} text='Get Your Location'/>) : (<Input disabled value={myLocation.latitude+', '+myLocation.longitude}/>)}
                                <br/>
                                <Button text='Explore restaurants' onClick={() => {setShowFilters(true);setShowMap(true);}}/>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                {myLocation == null ? (<Button onClick={() => {
                                    navigator.geolocation.getCurrentPosition(pos => {
                                        console.log(pos);
                                        setMyLocation({latitude: pos.coords.latitude, longitude: pos.coords.longitude});
                                    });
                                }} text='Get Your Location'/>) : (<Input disabled value={myLocation.latitude+', '+myLocation.longitude}/>)}
                                <br/>
                                <Button text='Explore restaurants' onClick={() => {setShowFilters(true);setShowMap(true);}}/>
                            </div>
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>) : (<OrderComponent/>)}
        </>
    )
};