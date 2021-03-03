import React, { useState } from 'react';
import classNames from 'classnames';
import Button from './Button';
import BackButton from './BackButton';
import Panel from './Panel';

export const Signup = () => {

    return (
        <div className="text-white p-2 m-auto w-full h-screen flex justify-center">
            <BackButton 
            className="my-auto mr-3 hover:-translate-x-1"
            />
            <Panel 
            className="hidden lg:flex" 
            content={<SignupText />} 
            />
            <Panel content={<SignupForm />} />
        </div>
    )
}

const SignupText = () => {
    return (
        <div className="flex-col h-full p-10 flex justify-between">
            <h1 className="text-3xl">BlockByBlock</h1>
            <p className="text-xl">We're sure<br/>you'll master your habits<br/>in no time.</p>
            <p>Thanks for signing up.</p>
        </div>
    );
}

const validateName = fullName => {
    const names = fullName.split(" ");
    if (names.length <= 1 || names[0].length <=1) return false;
    return true;
}

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateUsername = username => {
    return username.length > 2;
}

const SignupForm = () => {

    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [nameError,setNameError] = useState(false);
    const [usernameError,setUsernameError] = useState(false);
    const [emailError,setEmailError] = useState(false);

    const handleSubmit = () => {
        resetErrors();
        const nameValid = validateName(name);
        const emailValid = validateEmail(email);
        const usernameValid = validateUsername(username);

        if (!nameValid) setNameError(true);
        if (!emailValid) setEmailError(true);
        if (!usernameValid) setUsernameError(true);

        if (!nameValid || !emailValid || !usernameValid) return;
        alert("You're now signed up!");
        resetErrors();
    }
  


    const resetErrors = () => {
        setNameError(false);
        setUsernameError(false);
        setEmailError(false);
    }

    const defaultInputClasses = 'text-center w-full h-10 px-3 text-base placeholder-opacity-50 placeholder-gray-600 border rounded-lg focus:outline-none focus:ring focus:border-blue-300';
    const nameStyle = classNames(defaultInputClasses,{
      'ring ring-red-400 ring-width-2':nameError
    })
    const userNameStyle = classNames(defaultInputClasses,{
    'ring ring-red-400 ring-width-2':usernameError
    })
    const emailStyle = classNames(defaultInputClasses,{
    'ring ring-red-400 ring-width-2':emailError
    })
  
    return (
      <form className="text-center text-gray-700 my-auto w-full text-left rounded-lg ">
          <div className="flex p-2 flex-col">
              <div className="w-full m-2 px-2">
              <input 
              id="fullname"
              placeholder="Your full name" 
              className={nameStyle}
              type="text" 
              onChange={(e) => setName(e.target.value)} 
              value={name}
              />
              </div>
              <div className="w-full m-2 px-2">
              <input 
              id="username"
              placeholder="Pick a username"
              className={userNameStyle}
              type="text"
              onChange={(e)=> setUsername(e.target.value)}
              value={username}
              />
              </div>
              <div className="w-full m-2 px-2">
              <input 
              id="email"
              placeholder="Your email address"
              className={emailStyle}
              type="text" 
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              />
              </div>
              <Button 
              className={`items-center py-2 px-4
              text-white bg-kabul rounded-xl 
              hover:bg-kabul`} 
              text="SignUp"
              onClick={handleSubmit}
              />
          </div>
      </form>
    );
  }

  export default Signup;