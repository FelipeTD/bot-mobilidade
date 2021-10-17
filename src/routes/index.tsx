import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Motoristas from '../pages/Motoristas';
import Aplicativos from '../pages/Aplicativos';
import Cadastros from '../pages/Cadastros';
import Registros from '../pages/Registros';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/motoristas" component={Motoristas} />
        <Route path="/aplicativos" component={Aplicativos} />
        <Route path="/cadastros" component={Cadastros} />
        <Route path="/registros" component={Registros} />
    </Switch>
);

export default Routes;

