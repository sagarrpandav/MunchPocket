import {Container, InputBase, Typography, IconButton, Divider, Paper} from "@mui/material";
import {QuestionAnswers} from "./QuestionAnswers";
import React from "react";

export const UserActivity = ({questions, setUpdateQues, user, categories}) => {
    return (
        <>
            <Typography color='white' variant='h3' sx={{textAlign: 'center'}}> My Activity</Typography>
            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <QuestionAnswers categories={categories} questions={questions} setUpdateQues={setUpdateQues} user={user}/>
            </Container>
        </>
    );
};