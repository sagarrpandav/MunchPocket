import React, {useState, useEffect} from 'react'
import {Container, Grid,} from '@mui/material';
import Controls from "./controls/Controls";
import {Form, useForm} from "./useForm";


const states = ["AK - Alaska",
    "AL - Alabama",
    "AR - Arkansas",
    "AS - American Samoa",
    "AZ - Arizona",
    "CA - California",
    "CO - Colorado",
    "CT - Connecticut",
    "DC - District of Columbia",
    "DE - Delaware",
    "FL - Florida",
    "GA - Georgia",
    "GU - Guam",
    "HI - Hawaii",
    "IA - Iowa",
    "ID - Idaho",
    "IL - Illinois",
    "IN - Indiana",
    "KS - Kansas",
    "KY - Kentucky",
    "LA - Louisiana",
    "MA - Massachusetts",
    "MD - Maryland",
    "ME - Maine",
    "MI - Michigan",
    "MN - Minnesota",
    "MO - Missouri",
    "MS - Mississippi",
    "MT - Montana",
    "NC - North Carolina",
    "ND - North Dakota",
    "NE - Nebraska",
    "NH - New Hampshire",
    "NJ - New Jersey",
    "NM - New Mexico",
    "NV - Nevada",
    "NY - New York",
    "OH - Ohio",
    "OK - Oklahoma",
    "OR - Oregon",
    "PA - Pennsylvania",
    "PR - Puerto Rico",
    "RI - Rhode Island",
    "SC - South Carolina",
    "SD - South Dakota",
    "TN - Tennessee",
    "TX - Texas",
    "UT - Utah",
    "VA - Virginia",
    "VI - Virgin Islands",
    "VT - Vermont",
    "WA - Washington",
    "WI - Wisconsin",
    "WV - West Virginia",
    "WY - Wyoming"];
const countries = ['United States'];

const initialFValues = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: states[0],
    country: countries[0],
    profile: ''
}

export default function AuthForm(props) {
    const {addOrEdit, recordForEdit} = props

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('firstName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('lastName' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('profile' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
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
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <Controls.Input
                            name="firstName"
                            label="First Name"
                            value={values.fullName}
                            onChange={handleInputChange}
                            error={errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controls.Input
                            name="lastName"
                            label="Last Name"
                            value={values.lastName}
                            onChange={handleInputChange}
                            error={errors.lastName}
                        />
                        <Controls.Input
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <Controls.Input
                            label="City"
                            name="city"
                            value={values.city}
                            onChange={handleInputChange}
                        />
                        <Controls.Select
                            name="country"
                            label="Country"
                            value={values.country}
                            onChange={handleInputChange}
                            options={countries}
                            error={errors.country}
                        />
                        <Controls.Select
                            name="state"
                            label="State"
                            value={values.state}
                            onChange={handleInputChange}
                            options={states}
                            error={errors.state}
                        />

                    </Grid>
                </Grid>
            </Form>
        </Container>
    )
}
