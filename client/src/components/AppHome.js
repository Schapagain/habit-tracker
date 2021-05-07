import React from "react";
// import GoogleLogin from './GoogleLogin';
import { Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import HabitHome from "./HabitHome";
import About from "./About";
import Features from "./Features";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import AddHabitForm from "./AddHabitForm";
import ProtectedRoute from "./ProtectedRoute";
import BlockDetails from "./BlockDetails";
const AppHome = () => {
  const mainClass =
    "flex mx-auto max-w-screen-xl justify-between overflow-hidden flex-col min-h-screen bg-spring-rain w-full";
  return (
    <div className={mainClass}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/about" exact component={About} />
        <Route path="/features" exact component={Features} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <ProtectedRoute path="/home" exact component={Home} />
        <ProtectedRoute path="/addhabit" exact component={AddHabitForm} />
        <ProtectedRoute path="/habit/:id" exact component={HabitHome} />
        <ProtectedRoute
          path="/habit/:habitId/block/:blockId"
          exact
          component={BlockDetails}
        />
      </Switch>
    </div>
  );
};

export default AppHome;
