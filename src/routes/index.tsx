import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Bolt from '../pages/Bolt';
import Cartrack from '../pages/Cartrack';
import Freenow from '../pages/Freenow';
import FreenowGains from '../pages/FreenowGains';
import Inosat from '../pages/Inosat';
import Prio from '../pages/Prio';
import Uber from '../pages/Uber';
import Viaverde from '../pages/Viaverde';
import Login from '../pages/Login';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/bolt" component={Bolt} />
        <Route path="/cartrack" component={Cartrack} />
        <Route path="/freenow" exact component={Freenow} />
        <Route path="/freenow/gains" component={FreenowGains} />
        <Route path="/inosat" component={Inosat} />
        <Route path="/prio" component={Prio} />
        <Route path="/uber" component={Uber} />
        <Route path="/viaverde" component={Viaverde} />
        <Route path="/login" component={Login} />
    </Switch>
);

export default Routes;

