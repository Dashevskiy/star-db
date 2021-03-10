import React from 'react';
import './random-planet.css'
import SwapiService from "../../services/swapi-service";


export default class RandomPlanet extends React.Component {

    swapiService = new SwapiService();

    state = {
        id: 10,
        name: 'Kamino',
        population: '1000000000',
        rotation_period: '100',
        diameter: '19720'
    }

    updatePlanet = () => {
        const id = Math.floor(Math.random() * 16) + 2;
        this.swapiService.getPlanet(id)
            .then((planet) => {
                const {name, population, rotation_period, diameter} = planet;
                this.setState({
                    id,
                    name,
                    population,
                    rotation_period,
                    diameter
                })
            })
    }

    render() {
        const {id, name, population, rotation_period, diameter} = this.state;

        setTimeout(this.updatePlanet, 2500)

        return (
            <div className='random-planet'>
                <img className="planet-image"
                     src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                     alt="planet"/>
                <div>
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Population</span>
                            <span>{population}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Rotation Period</span>
                            <span>{rotation_period}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Diameter</span>
                            <span>{diameter}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}