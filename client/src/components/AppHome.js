import React, { useContext } from 'react';
// import GoogleLogin from './GoogleLogin';
import HabitList from './HabitList';
import Quote from './Quote';
import {Route, Switch} from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import Landing from './Landing';
import HabitHome from './HabitHome';
import About from './About';
import Features from './Features';

const AppHome = (props) => {
  const mainClass = "flex justify-between flex-col min-h-screen w-full"
  const { user } = useContext(GlobalContext);
  return (
    <div className={mainClass}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/habit" exact component={HabitHome} />
        <Route path="/about" exact component={About} />
        <Route path="/features" exact component={Features} />
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