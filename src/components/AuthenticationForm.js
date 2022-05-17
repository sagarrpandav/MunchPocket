import {Grid, Typography} from "@mui/material";
import Input from "./controls/Input";
import Button from "./controls/Button";
import DadtePicker from "./controls/DatePicker";
import {Form, useForm} from "./useForm";
import RadioGroup from "./controls/RadioGroup";

const initialFValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: 'male',
    birthDate: new Date(),
};
const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

export const AuthenticationForm = ({signUp}) => {
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? (fieldValues.email ? "" : "This field is required.") : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
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
        signUp();
        if (validate()) {
            //call signup
        }
    };

    return (
        <Grid container sx={{height: '80vh'}}>
            <Grid sx={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} item
                  xs={5}>
                <Typography variant='h4'>Already a user ?</Typography>
                <br/>
                <Input label='Enter your phone number'/>
                <br/>
                <Button type='submit' text='Get OTP'/>
            </Grid>
            <Grid item xs={0.01} sx={{backgroundColor: "gray"}}/>
            <Grid item container xs={6.98} sx={{display: 'flex', alignItems: 'center'}} spacing={1}>
                <Form style={{display: 'flex', flexDirection: 'column',width: '100%', height: '70vh'}} onSubmit={handleSubmit}>
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <Typography variant='h4'>New to Munch-Pocket ? Sign up !</Typography>
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Input name="firstName"
                                   label="First Name"
                                   value={values.firstName}
                                   onChange={handleInputChange}
                                   error={errors.firstName}/>
                        </Grid>
                        <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Input name="lastName"
                                   label="Last Name"
                                   value={values.lastName}
                                   onChange={handleInputChange}
                                   error={errors.lastName}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Input label="Mobile"
                               name="mobile"
                               value={values.mobile}
                               onChange={handleInputChange}
                               error={errors.mobile}/>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Input label="Email"
                               name="email"
                               value={values.email}
                               onChange={handleInputChange}
                               error={errors.email}/>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <DadtePicker name="birthDate"
                                     label="Birth Date"
                                     value={values.birthDate}
                                     onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <RadioGroup name="gender"
                                    label="Gender"
                                    value={values.gender}
                                    onChange={handleInputChange}
                                    items={genderItems}/>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            type="submit"
                            text="Sign Up and Get OTP" />
                    </Grid>
                </Form>
            </Grid>
        </Grid>
    )
};