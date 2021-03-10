import React from 'react';
import SwapiService from "../../../services/swapi-service";
import ItemList from "../../item-list/item-list";
import ItemDetails from "../../item-details/item-details";
import Record from "../../record/record";

import './planets-page.css'

export default class PlanetsPage extends React.Component {

    state = {
        planets: [],
        itemId: null
    }

    swapiService = new SwapiService();

    componentDidMount() {
        this.swapiService.getAllPlanets()
            .then((planets) => {
                this.setState({
                    planets
                })
            })
    }

    onSelected = (id) => {
        this.setState({
            itemId: id[1]
        })
    }

    getData = () => {
        return this.swapiService.getPlanet(this.state.itemId)
    }

    render() {
        const {planets, itemId} = this.state;
        return (
            <div className='people-page'>
                <ItemList list={planets} onSelected={this.onSelected}/>

                <ItemDetails
                    list={planets}
                    itemId={itemId}
                    getData={this.getData}
                    getImageUrl={this.swapiService.getPlanetImage}>

                    <Record field="name" label="Name: "/>
                    <Record field="diameter" label="Diameter: "/>
                    <Record field="population" label="Population: "/>
                </ItemDetails>
            </div>
        )
    }
}