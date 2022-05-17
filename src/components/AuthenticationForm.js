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
    userPassword: ''
};
const genderItems = [
    {id: 'male', title: 'Male'},
    {id: 'female', title: 'Female'},
    {id: 'other', title: 'Other'},
]

export const AuthenticationForm = ({signUp, setUser}) => {
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
        if ('userPassword' in fieldValues) {
            temp.userPassword = fieldValues.userPassword?.length > 8 ? "" : "Minimum 8 characters required.";
        }
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const validateLogin = (fieldValues = values) => {
        let temp = {...errors}
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? (fieldValues.email ? "" : "This field is required.") : "Email is not valid."
        if ('userPassword' in fieldValues) {
            temp.userPassword = fieldValues.userPassword?.length >= 8 ? "" : "Minimum 8 characters required.";
        }
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
        e.preventDefault();
        if (validate()) {
            //call signup
            let res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/sign_up', {
                method: 'POST', body: JSON.stringify(
                    {
                        first_name: values.firstName,
                        last_name: values.lastName,
                        date_of_birth: values.birthDate,
                        phone_number: values.mobile,
                        email: values.email,
                        password: values.userPassword
                    })
            });
            res = await res.json();
            if (res.length > 0) {
                setUser(res[0]);
            } else {
                setErrors({
                    ...errors,
                    email: "User already exists"
                });
            }
        }
    };

    return (
        <Grid container sx={{height: '80vh'}}>
            <img style={{
                position: 'absolute',
                opacity: '0.15',
                left: '0',
                top: '0vh'
            }} src='https://d2o6c6evk5zqsg.cloudfront.net/images/webp/home/Soba_Isolated.webp'/>
            <img style={{
                position: 'absolute',
                opacity: '0.15',
                right: '0',
                top: '30vh'
            }} src='https://d2o6c6evk5zqsg.cloudfront.net/images/webp/home/Steak_Isolated.webp'/>
            <Grid sx={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} item
                  xs={5}>
                <Typography variant='h4'>Already a user ?</Typography>
                <br/>
                <Input label="Email"
                       name="email"
                       value={values.email}
                       onChange={handleInputChange}
                       error={errors.email}/>
                <br/>
                <Input name="userPassword"
                       type='password'
                       label="Password"
                       value={values.userPassword}
                       error={errors.userPassword}
                       onChange={handleInputChange}/>
                <br/>
                <Button text='Login' onClick={async () => {
                    if (validateLogin()) {
                        let res = await fetch('https://fnyq0pfg5e.execute-api.us-east-1.amazonaws.com/dev/sign_in', {
                            method: 'POST',
                            body: JSON.stringify({email: values.email, password: values.userPassword})
                        });
                        res = await res.json();
                        if (res.length > 0) {
                            setUser(res[0]);
                        } else {
                            setErrors({
                                ...errors,
                                email: "Authentication Error",
                                userPassword: "Authentication Error"
                            });
                        }
                    }
                }}/>
            </Grid>
            <Grid item xs={0.01} sx={{backgroundColor: "gray"}}/>
            <Grid item container xs={6.98} sx={{display: 'flex', alignItems: 'center'}} spacing={1}>
                <Form style={{display: 'flex', flexDirection: 'column', width: '100%', height: '70vh'}}
                      onSubmit={handleSubmit}>
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
                        <Input name="userPassword"
                               type='password'
                               label="Password"
                               value={values.userPassword}
                               error={errors.userPassword}
                               onChange={handleInputChange}/>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            type="submit"
                            text="Sign Up and Get Verification Email"/>
                    </Grid>
                </Form>
            </Grid>
        </Grid>
    )
};