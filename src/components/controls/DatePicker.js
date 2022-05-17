import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField} from "@mui/material";

export default function DadtePicker(props) {

    const {name, label, value, onChange} = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
