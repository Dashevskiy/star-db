import React, {Component} from 'react';
import PropTypes from "prop-types";

import SwapiService from "../../services/swapi-service";
import './random-planet.css';
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";


export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        id: null,
        name: null,
        population: null,
        rotationPeriod: null,
        diameter: null,
        loading: true,
        error: false
    }

    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        population: PropTypes.number,
        rotationPeriod: PropTypes.number,
        diameter: PropTypes.number,
        loading: PropTypes.bool,
        error: PropTypes.bool,
        interval: PropTypes.number
    }

    interval = 2000;

    componentDidMount() {
        setInterval(this.updatePlanet, this.interval)
    }

    errorIndicator = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 16) + 2
        this.swapiService
            .getPlanet(id)
            .then((planet) => {
                this.setState({
                    id: id,
                    name: planet.name,
                    population: planet.population,
                    rotationPeriod: planet.rotation_period,
                    diameter: planet.diameter,
                    loading: false,
                    error: false
                })
            })
            .catch(this.errorIndicator)
    }

    render() {
        const {id, name, population, rotationPeriod, diameter, loading, error} = this.state;

        const planetView = <React.Fragment>
            <img className="planet-image"
                 alt='img'
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population:</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period:</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter:</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>

        return (
            <div className="random-planet jumbotron rounded">
                {error ? <ErrorIndicator/> : loading ? <Spinner/> : planetView}
            </div>
        );
    }
}