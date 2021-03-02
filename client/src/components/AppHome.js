import React, { useContext } from 'react';
// import GoogleLogin from './GoogleLogin';
import HabitList from './HabitList';
import Quote from './Quote';
import {Route, Switch} from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import Landing from './Landing';
import HabitHome from './HabitHome';

const AppHome = (props) => {
  const mainClass = "flex justify-between flex-col min-h-screen w-full bg-indigo-400"
  const { user } = useContext(GlobalContext);
  return (
    <div className={mainClass}>
      <div>
        <h1 className="text-4xl p-3 m-2">Hello {user.name || 'visitor'}.<br/> Here's the quote of the day.</h1>
        <Quote />
      </div>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/habit" exact component={HabitHome} />
        <Route path="/home" exact render={() => {
          return(
                <HabitList />
          );
        }} /> 
      </Switch>
      <h6>This is a crazy footer</h6>
      </div>
    // <GoogleLogin/>
  );
}

export default AppHome;