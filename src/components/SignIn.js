import React, { useState } from 'react';
import './SignIn.css';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        (e.target.value === "") ? setEmailError("Please enter your email!") : setEmailError("");
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        (e.target.value === "") ? setPasswordError("Please enter your password!") : setPasswordError("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    remember: rememberMe
                })
            };

            console.log(requestOptions)

            // Calling API to post user credentials to check. 
            // It's better practice to call API in seperate file but as I am building a single page so I am putting it here.

            fetch(`http://localhost:8000/api/login`, requestOptions)
                .then((response) => console.log(response))
                .catch(error => console.log(error))
        }
    }


    return (
        <div className="signin">
            <h1 className="signin__header">Sign in</h1>
            <form className="signin__form" onSubmit={handleSubmit}>
                <div className="signin__form-section">
                    <label className="signin__label">Email</label>
                    <input className="signin__input" type="email" value={email} onChange={handleEmailChange} required />
                    {emailError &&
                        <p className="signin__error">{emailError}</p>
                    }
                </div>
                <div className="signin__form-section">
                    <label className="signin__label">Password</label>
                    <input className="signin__input" type="password" value={password} onChange={handlePasswordChange} required />
                    {passwordError &&
                        <p className="signin__error">{passwordError}</p>
                    }
                </div>
                <div>
                    <input type="checkbox" className="signin__checkbox" onChange={() => setRememberMe(!rememberMe)} />
                    <label>Remember me?</label>
                </div>
                <button type="submit" className="signin__submit">Sign in</button>
            </form>
            <div className="signin__footer">
                <a href="#" className="signin__link">Forgot your password?</a>
                <p>Don't have an account? <a href="#" className="signin__link">Sign up</a></p>
                <a href="#" className="signin__link">Resend email confirmation</a>
            </div>
        </div>
    )
}

export default SignIn
