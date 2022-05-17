import {Button, Card, CardActions, CardMedia, Typography, Grid, CardContent} from "@mui/material";
import {IndivQuestionAnswer} from "./IndivQuestionAnswer";

export const QuestionAnswers = ({questions = [], user, setUpdateQues, categories}) => {
    return (
        <>
            {
                questions.map(i => {
                    return (
                        <Grid item xs={12}>
                            <IndivQuestionAnswer question={i} user={user} setUpdateQues={setUpdateQues} categories={categories}/>
                        </Grid>)
                })
            }
        </>
    );
};