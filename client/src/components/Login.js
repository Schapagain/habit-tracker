import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Button from './Button';
import BackButton from './BackButton';
import LoginQuote from './LoginQuote';
import Panel from './Panel';

export const Login = () => {

    return (
        <div className="text-white p-2 m-auto w-full h-screen flex justify-center">
            <BackButton 
            className="my-auto mr-3 hover:-translate-x-1"
            />
            <Panel 
            className="hidden lg:flex"
            content={<LoginText />} />
            <Panel content={<LoginForm />} />
        </div>
    )
}

const LoginText = () => {
    return (
        <div className = "flex-col h-full p-4">
                <h1 className="text-3xl mt-20">BlockByBlock</h1>
                <div className="mb-20">
                    <p className="text-xl my-20">Welcome back!</p>
                    <LoginQuote/>
                </div>
        </div>
    );
}

const authenticate = async () => {
    return false;
}

const LoginForm = () => {

    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [error,setError] = useState("");

    const history = useHistory();

    const handleSubmit = async () => {
        resetErrors();
        const authenticated = await authenticate({username,password});

        if (!authenticated) {
            setError("Invalid credentials!");
        } else {
            history.push("/home");
            resetErrors();
        }
        
    }
  
    const resetErrors = () => {
        setError("");
    }

    const defaultInputClasses = 'text-center w-full h-10 px-3 text-base placeholder-opacity-50 placeholder-gray-600 border rounded-lg focus:outline-none focus:ring focus:border-blue-300';
    const passwordStyle = classNames(defaultInputClasses,{
      'ring ring-red-400 ring-width-2':error.length > 0
    })
    const userNameStyle = classNames(defaultInputClasses,{
    'ring ring-red-400 ring-width-2':error.length > 0
    })
  
    return (
      <form className="text-center mx-4 p-4 text-gray-700 my-auto text-left rounded-lg ">
          <div className="flex p-2 flex-col">
              <div className="w-full m-2 px-2">
              <input 
              id="username"
              placeholder="Username"
              className={userNameStyle}
              type="text"
              onChange={(e)=> {setError("");setUsername(e.target.value)}}
              value={username}
              />
              </div>
              <div className="w-full m-2 px-2">
              <input 
              id="fullname"
              placeholder="Password" 
              className={passwordStyle}
              type="password" 
              onChange={(e) => {setError("");setPassword(e.target.value)} }
              value={password}
              />
              </div>
              {error.length > 0 && <p className="text-white">{error}</p>}
              <Button 
              className={`items-center py-2 px-4
              text-white bg-kabul rounded-xl 
              hover:bg-kabul`} 
              text="Login"
              onClick={handleSubmit}
              />
          </div>
      </form>
    );
  }

  export default Login;