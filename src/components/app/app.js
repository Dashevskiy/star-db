import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './app.css';
import Header from "../header/header";
import Login from "../pages/login-page/login-page";
import Secret from "../pages/secret-page/secret-page";
import RandomPlanet from "../random-planet/random-planet";
import PeoplePage from "../pages/people-page/people-page";
import StarshipsPage from "../pages/starship-page/starships-page";
import PlanetsPage from "../pages/planets-page/planets-page";

export default class App extends React.Component {

    state = {
        isLogged: false
    }

    onLogin = () => {
        this.setState({
            isLogged: true
        })
    }

    render() {
        const {isLogged} = this.state;

        return (
            <BrowserRouter>
                <Header/>
                <RandomPlanet/>
                <Switch>
                    <Route exact path='/' render={() => <h1>Welcome to StarDB</h1>}/>

                    <Route exact path='/people/' component={PeoplePage}/>
                    <Route exact path='/planets/' component={PlanetsPage}/>
                    <Route exact path='/starships/' component={StarshipsPage}/>
                    <Route exact path='/login' render={() => <Login isLogged={isLogged} onLogin={this.onLogin}/>}/>
                    <Route exact path='/secret' render={() => <Secret isLogged={isLogged}/>}/>

                    <Route render={() => <h1>Page not found</h1>}/>
                </Switch>
            </BrowserRouter>
        )
    }
}