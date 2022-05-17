import {Paper, Typography, Grid, Container, IconButton, InputBase, Divider} from "@mui/material";
import React, {useState} from "react";
import {QuestionAnswers} from "./QuestionAnswers";
import {flushSync} from "react-dom";
import Select from "./controls/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Input from "./controls/Input";
import Button from "./controls/Button";

export const AllActivity = ({questions, user, setUpdateQues, categories, setFilterClause}) => {
    const [term, setTerm] = useState('');
    const [catFilter, setCatFilter] = useState('');
    return (
        <>
            <Typography color='white' variant='h3' sx={{textAlign: 'center'}}> All Activity</Typography>
            <br/>

            <Grid container sx={{marginLeft: '20vw', marginRight: '20vw', backgroundColor: 'white', width: '60vw', alignItems: 'center'}}>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                    <Input onChange={(e) => {setTerm(e.target.value)}} label='Please enter search term'/>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id="category"
                        select
                        label="Category"
                        name="category"
                        onChange={(e) => {setCatFilter(e.target.value)
                        }}
                        helperText="Please select your Topic"
                    >
                        {categories?.map(data => (
                            <MenuItem key={data.id} value={data.id}>
                                {data.topic_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item><Button onClick={() => {setFilterClause(term); setUpdateQues(true);}} text='search' color='warning'/></Grid>
                <Grid item xs={2}></Grid>
            </Grid>


            <br/>
            <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <QuestionAnswers categories={categories} questions={catFilter == '' || catFilter == '999' ? questions : questions.filter(i => i.topic_id == catFilter)} user={user} setUpdateQues={setUpdateQues}/>
            </Container>
        </>
    )
};