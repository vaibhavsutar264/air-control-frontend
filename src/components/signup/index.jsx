import React, {useState} from "react";
import SignUp from "./Signup.module.css"
import {Link,useNavigate} from "react-router-dom"

import {useGoogleLogin} from '@react-oauth/google';
import { useAddUserSignUpMutation } from "state/api";


const InitState = {
    firstName: "",
    lastName: "",
    email: '',
    password: '',
    confirmPassword: ''
}


function Signup() {
    const navigate = useNavigate();
    const [addUserSignUp, response] = useAddUserSignUpMutation()
    // const dispatch = useDispatch();
    const [sForm,
        setsForm] = useState(InitState)

    const handleChange = (e) => setsForm({
        ...sForm,
        [e.target.name]: e.target.value
    });

    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        // signupGoogle(accessToken,navigate)
        addUserSignUp({
            googleAccessToken: accessToken
        })
      .unwrap()
      .then((res) => {
        localStorage.setItem("userToken",res.token)
      }).catch((err)=>{
        console.log(err)
      })

      navigate('/pm1-particles')
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        // if (sForm.firstName !== "" && sForm.lastName !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
        //     signup(sForm,navigate)
        // }
        addUserSignUp(sForm)
      .unwrap()
      .then((res) => {
        localStorage.setItem("userToken",res.token)
      }).catch((err)=>{
        console.log(err)
      })

      navigate('/pm1-particles')

    }

    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});
    return (
        <div className={SignUp.loginContainer}>
            <div className={SignUp.loginContainerv2}>
                <h1>Create your account</h1>

                <div className={SignUp.inputContainer}>
                    <label>FRIST NAME</label>
                    <input onChange={handleChange} name="firstName" placeholder="enter your first name" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>LAST NAME</label>
                    <input name="lastName" onChange={handleChange} placeholder="enter your last name" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>EMAIL</label>
                    <input name="email" onChange={handleChange} placeholder="enter your email" type="email"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>PASSWORD</label>
                    <input name="password" onChange={handleChange} placeholder="enter your password" type="password"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>CONFIRM PASSWORD</label>
                    <input name="confirmPassword" onChange={handleChange} placeholder="retype your password" type="password"/>
                </div>

                <div className={SignUp.footerContainer}>
                        <div>
                            Already Signed Up? <Link to="/account/login">Login</Link>
                        </div>
                        <div>
                            <Link to="/account/forgotpassword">Forgot Password?</Link>
                        </div>
                    </div>

                <button onClick={handleOnSubmit} className={SignUp.loginBTN}>REGISTER</button>
                 

                 
            </div>

        </div>
    )
}

export default Signup;