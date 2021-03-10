import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";

import './app.css';
import PeoplePage from "../people-page/people-page";
import StarshipsPage from "../starships-page/starships-page";
import PlanetsPage from "../planets-page/planets-page";
import LoginPage from "../login-page/login-page";
import SecretPage from "../secret-page/secret-page";

export default class App extends Component {

    state = {
        loggedIn: false
    }

    onLogin = () => {
        this.setState({
            loggedIn: true
        })
    }

    render() {
        const {loggedIn} = this.state;
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Header/>
                    <RandomPlanet/>
                    <Switch>
                        <Route path='/' exact render={() => <h1>Welcome to StarDB</h1>}/>
                        <Route path='/people' exact component={PeoplePage}/>
                        <Route path='/planets' exact component={PlanetsPage}/>
                        <Route path='/starships' exact component={StarshipsPage}/>

                        <Route path='/people/:id'
                               render={({match}) => {
                                   const {id} = match.params;
                                   return <PeoplePage itemId={id}/>
                               }}
                        />
                        <Route path='/planets/:id'
                               render={({match}) => {
                                   const {id} = match.params;
                                   return <PlanetsPage itemId={id}/>
                               }}
                        />
                        <Route path='/starships/:id'
                               render={({match}) => {
                                   const {id} = match.params;
                                   return <StarshipsPage starshipId={id}/>
                               }}
                        />

                        <Route path='/login' render={() => {
                            return <LoginPage loggedIn={loggedIn} onLogin={this.onLogin}/>
                        }}/>
                        <Route path='/secret' render={() => {
                            return <SecretPage loggedIn={loggedIn}/>
                        }}/>

                        <Route render={()=><h2>Page not found</h2>}/>
                    </Switch>
                </BrowserRouter>

            </React.Fragment>
        );
    };
}