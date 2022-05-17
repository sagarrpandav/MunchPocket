import React, {useEffect, useState} from "react";
import apiUtil from "../apiUtil";
import {Card, CardContent, Paper, Typography, Grid, Container} from "@mui/material";
import {QuestionAnswers} from "./QuestionAnswers";
import Button from "./controls/Button";
import Input from "./controls/Input";

export const UserProfile = ({user}) => {
    const [userData, setUserData] = useState();
    const [userDesc, setUserDesc] = useState('');
    const [updateUser, setUpdateUser] = useState(false);
    useEffect(() => {
        (async () => {
            let res = await apiUtil.get_user_details({user_id: user.id});
            console.log(res);
            setUserData(res);
            setUserDesc(res.profile);
        })();
    }, []);

    useEffect(() => {
        if (updateUser) {
            (async () => {
                let res = await apiUtil.get_user_details({user_id: user.id});
                console.log(res);
                setUserData(res);
                setUserDesc(res.profile);
                setUpdateUser(false);
            })();
        }
    }, [updateUser]);

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <br/>
            <br/>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant='body1'>FirstName: {userData?.first_name}</Typography>
                            <Typography variant='body1'>LastName: {userData?.last_name}</Typography>
                            <Typography variant='body1'>DateOfBirth: {userData?.date_of_birth}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='body1'>Country: {userData?.country}</Typography>
                            <Typography variant='body1'>State: {userData?.state}</Typography>
                            <Typography variant='body1'>City: {userData?.city}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body1'> Email: {userData?.email}</Typography>
                            <Typography variant='body1'>Status : {userData?.status}</Typography>
                            <Typography variant='body1'>Description: {userData?.profile}</Typography>
                            <br/>
                            <Input value={userDesc} label='Update Profile Description' onChange={(e) => {
                                setUserDesc(e.target.value)
                            }}/>
                            <Button text='Update' onClick={async () => {
                                if(userDesc == '') {
                                    window.alert("Please enter desc");
                                }
                                else {
                                    await apiUtil.update_profile({user_id: user.id, profile: userDesc});
                                    setUpdateUser(true);
                                }
                            }}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>

    )
};