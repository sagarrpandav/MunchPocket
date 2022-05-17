import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MUITimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimePicker(props) {

    const {name, label, value, onChange} = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MUITimePicker
                label="Basic"
                value={value}
                onChange={(newValue) => {
                    onChange(convertToDefEventPara(newValue))
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
