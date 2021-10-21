import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Configuracao from '../pages/Config';
import Home from '../pages/Home';
import MyCalls from '../pages/MyCalls';
import Login from '../pages/Login';

const Router = () => {

    return (
        <Switch>
            <Route exact path="/">
                <Home></Home>
            </Route>
            <Route exact path="/meus-atendimentos">
                <MyCalls></MyCalls>
            </Route>

            <Route exact path="/ajuda">

            </Route>

            <Route exact path="/perfil">
                {/* <Configuracao></Configuracao>    */}
            </Route>

            <Route exact path="/configuracao">
                <Configuracao></Configuracao>
            </Route>

            {/* <Route exact path="/login">
                <Login></Login>
            </Route> */}

        </Switch>
    )
}

export default Router;