import {Form, useForm} from "./useForm";
import {Grid} from "@mui/material";
import Input from "./controls/Input";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "./controls/Button";
import * as React from "react";
import api from "../apiUtil";
import apiUtil from "../apiUtil";

export const AnswerQuestion = ({question, answerQuestion, user, setOpenPopup, setUpdateQues}) => {
    const initialFValues = {
        id: 0,
        body: ''
    };

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('body' in fieldValues)
            temp.body = fieldValues.body ? "" : "This field is required.";
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = async e => {
        e.preventDefault()
        if (validate()) {
            let res = await apiUtil.answer_ques({user_id: user.id, question_id: question.id_question, answer: values.body});
            setOpenPopup(false);
            setUpdateQues(true);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Input
                        name="body"
                        label="Body"
                        value={values.body}
                        onChange={handleInputChange}
                        error={errors.body}
                        sx={{width: '100%'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit"
                            text="Post Answer"/>
                </Grid>
                <Grid item xs={12}>
                    <div sx={{height: '10vh'}}></div>
                </Grid>
            </Grid>
        </Form>
    )
};