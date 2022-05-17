import {Form, useForm} from "./useForm";
import {Grid} from "@mui/material";
import Input from "./controls/Input";
import Button from "./controls/Button";
import Select from "./controls/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useEffect, useState} from "react";
import apiUtil from "../apiUtil";

const initialFValues = {
    id: 0,
    title: '',
    body: '',
    category: ''
};


export const AddQuestionForm = ({question, user, setOpenPopup, onHandleSubmit}) => {
    const [categories, setCategories] = useState([]);
    useEffect( () => {
        (async () => {
            let topics = await apiUtil.gettopics();
            setCategories(topics);
        })();
    }, []);

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required.";
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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            onHandleSubmit(values);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Input
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                        sx={{width: '100%'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        label="Body"
                        name="body"
                        value={values.body}
                        onChange={handleInputChange}
                        error={errors.body}
                        sx={{width: '100%'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="category"
                        select
                        label="Category"
                        value={values.category}
                        name="category"
                        onChange={handleInputChange}
                        helperText="Please select your Topic"
                    >
                        {categories.map(data => (
                            <MenuItem key={data.id} value={data.id}>
                                {data.topic_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit"
                            text="Post Question"/>
                </Grid>
                <Grid item xs={12}>
                    <div sx={{height: '10vh'}}></div>
                </Grid>
            </Grid>
        </Form>
    )
};