import React from 'react'
import {Button} from '@mui/material';


const useStyles = theme => ({
    root: {
        minWidth: 0,
        /*margin: theme.spacing(0.5)*/
    },
    secondary: {
        /*backgroundColor: theme.palette.secondary.light,*/
        '& .MuiButton-label': {
            /*color: theme.palette.secondary.main,*/
        }
    },
    primary: {
        /*backgroundColor: theme.palette.primary.light,*/
        '& .MuiButton-label': {
            /*color: theme.palette.primary.main,*/
        }
    },
});

export default function ActionButton(props) {

    const {color, children, onClick, ...other} = props;
    const classes = useStyles();

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            color={color}
            onClick={onClick}
            {...other}>
            {children}
        </Button>
    )
}
