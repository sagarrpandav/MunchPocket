import {Button, Card, CardActions, CardContent, CardMedia, Typography, Paper, Grid} from "@mui/material";
import ActionButton from "./controls/ActionButton";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Popup from "./Popup";
import {AddQuestionForm} from "./AddQuestionForm";
import React from "react";
import {AnswerQuestion} from "./AnswerQuestion";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from '@mui/icons-material/Star';
import apiUtil from "../apiUtil";

export const IndivQuestionAnswer = ({question, user, setUpdateQues, categories}) => {
    const [openPopup, setOpenPopup] = React.useState(false);

    return (
        <>
            <Card sx={{width: '80vw', marginBottom: '1vh', backgroundColor: 'lightgrey'}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {question.title}
                    </Typography>
                    <Typography variant='overline'>{categories.find(i => i.id == question?.topic_id).topic_name}</Typography>
                    <Typography variant="h6" color="text.secondary">
                        {question.body}
                    </Typography>
                    <br/>
                    <Typography variant='body2' color="text.secondary">Asked
                        by {question.question_posted_by_first_name} {question.question_posted_by_last_name} on {question.date_posted}</Typography>
                    <br/>
                    {question?.answers?.length > 0 ? (
                        question.answers.map(i => {
                            return (<Card>
                                <CardContent>
                                    <Grid container sx={{alignItems: 'center'}}>
                                        <Grid item xs={10}>
                                            <Typography variant='body2'>{i.answerText}</Typography>
                                            <Typography variant='caption'>Answered by {i.answeredBy} on {i.answerDate}</Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <ActionButton onClick={async () => {
                                                let res = i.vote ? await apiUtil.dislike_answer({user_id: user.id, answer_id: i.answerId}) : await apiUtil.like_answer({user_id: user.id, answer_id: i.answerId});
                                                setUpdateQues(true);
                                            }}>{i.votes}{i.vote ? (<ThumbUpIcon/>) : (<ThumbUpOffAltIcon/>)}</ActionButton>
                                        </Grid>
                                        <Grid item xs={1}>
                                            {i.isBestAnswer ? (<StarIcon/>) : (<></>)}
                                        </Grid>
                                    </Grid>
                                </CardContent></Card>)
                        })
                    ) : (<></>)}
                </CardContent>
                <CardActions>
                    <ActionButton size="small" color="warning" onClick={() => setOpenPopup(true)}>
                        <QuestionAnswerIcon/>
                        Answer</ActionButton>
                </CardActions>
            </Card>
            <Popup
                title="Post Answer"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AnswerQuestion question={question} user={user} setOpenPopup={setOpenPopup}
                                setUpdateQues={setUpdateQues}/>
            </Popup>
        </>
    )
};