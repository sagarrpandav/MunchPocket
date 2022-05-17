import logo from './logo.svg';
import './App.css';
import {Container} from "@mui/material";
import Header from "./components/Header";
import {useEffect, useState} from "react";
import {MainPage} from "./components/MainPage";
import {AuthenticationForm} from "./components/AuthenticationForm";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import Auth from "@aws-amplify/auth";
Amplify.configure(awsExports);

const NOTSIGNIN = 'You are NOT logged in';
const SIGNEDIN = 'You have logged in successfully';
const SIGNEDOUT = 'You have logged out successfully';
const WAITINGFOROTP = 'Enter OTP number';
const VERIFYNUMBER = 'Verifying number (Country code +XX needed)';


function App() {

    const [showFilters, setShowFilters] = useState(false);
    const [reefetch, setReefetch] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [message, setMessage] = useState('Welcome to Demo');
    const [user, setUser] = useState(/*{id: 113, name: 'dssd dwaw'}*/);
    const [filterName, setFilterName] = useState('');
    const [rating, setRating] = useState('0');
    const [price, setPrice] = useState('0');
    const [cuisine, setCuisine] = useState('-1');
    const [session, setSession] = useState(null);
    const [otp, setOtp] = useState('');
    const [number, setNumber] = useState('+19293209172');
    const password = Math.random().toString(10) + 'Abc#'

    const [orderPage, setOrderPage] = useState(false);
    const [uploadReceipt, setUploadReceipt] = useState(false);
    useEffect(() => {
        if (sessionStorage.user) {
            setUser(JSON.parse(sessionStorage.user))
        }
        verifyAuth();
    }, []);
    const verifyAuth = () => {
        Auth.currentAuthenticatedUser()
            .then((user) => {
                setUser(user);
                setMessage(SIGNEDIN);
                user.resendConfirmationCode(a => console.log(a));
                setSession(null);
            })
            .catch((err) => {
                console.error(err);
                setMessage(NOTSIGNIN);
            });
    };
    const signOut = () => {
        if (user) {
            Auth.signOut();
            setUser(null);
            setOtp('');
            setMessage(SIGNEDOUT);
        } else {
            setMessage(NOTSIGNIN);
        }
    };
    const signIn = () => {
        setMessage(VERIFYNUMBER);
        Auth.signIn(number)
            .then((result) => {
                setSession(result);
                setMessage(WAITINGFOROTP);
            })
            .catch((e) => {
                if (e.code === 'UserNotFoundException') {
                    signUp();
                } else if (e.code === 'UsernameExistsException') {
                    setMessage(WAITINGFOROTP);
                    signIn();
                } else {
                    console.log(e.code);
                    console.error(e);
                }
            });
    };
    const signUp = async () => {
        const result = await Auth.signUp({
            username: number,
            password,
            attributes: {
                phone_number: number,
            },
        }).then(() => {
            signIn()});
        return result;
    };
    const verifyOtp = () => {
        Auth.sendCustomChallengeAnswer(session, otp)
            .then((user) => {
                setUser(user);
                setMessage(SIGNEDIN);
                setSession(null);
            })
            .catch((err) => {
                setMessage(err.message);
                setOtp('');
                console.log(err);
            });
    };

    return (
        <div className='myBody'>
            <Header setUser={setUser} setShowMap={setShowMap} setReefetch={setReefetch} user={user} setShowFilters={setShowFilters} showFilters={showFilters} filterName={filterName} setFilterName={setFilterName} rating={rating} setRating={setRating} price={price} setPrice={setPrice} cuisine={cuisine} setCuisine={setCuisine}/>
            {user ? <MainPage setShowMap={setShowMap} showMap={showMap} user={user} setShowFilters={setShowFilters} filterName={filterName} rating={rating} price={price} cuisine={cuisine} reefetch={reefetch} setReefetch={setReefetch}/> : <AuthenticationForm setUser={setUser} signUp={signIn}/>}
        </div>
    );
}

export default App;
