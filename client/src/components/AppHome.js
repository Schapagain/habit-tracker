import React from 'react';
// import GoogleLogin from './GoogleLogin';
import HabitList from './HabitList';
import {Route, Switch} from 'react-router-dom';
import Landing from './Landing';
import HabitHome from './HabitHome';
import About from './About';
import Features from './Features';
import { Login } from './Login';

const AppHome = (props) => {
  const mainClass = "flex mx-auto max-w-screen-xl justify-between flex-col min-h-screen bg-spring-rain w-full"
  return (
    <div className={mainClass}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/habit" exact component={HabitHome} />
        <Route path="/about" exact component={About} />
        <Route path="/features" exact component={Features} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact render={() => {
          return(
                <HabitList />
          );
        }} /> 
      </Switch>
      </div>
    // <GoogleLogin/>
  );
}

export default AppHome;