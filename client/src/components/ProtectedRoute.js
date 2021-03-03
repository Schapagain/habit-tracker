
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState';

export default function ProtectedRoute({ component, path, ...props }) {
    const { isAuthenticated } = useContext(GlobalContext);
    return isAuthenticated ? (
        <Route props={props} path={path} component={component} />
    ) : (
        <Redirect to="/login" />
    );
}