import React from 'react';
import { Switch, Redirect } from 'react-router';
import PrivateRoute from '../PrivateRoute';
import Users from './Users';

const MainRoutes = () => {
    return (
        <Switch>
            <PrivateRoute exact path='/users' component={Users} />
            <Redirect from='*' to='/users' />
        </Switch>
    );

}
export default MainRoutes;