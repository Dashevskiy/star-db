import React from 'react';
import SwapiService from "../../../services/swapi-service";
import ItemList from "../../item-list/item-list";
import ItemDetails from "../../item-details/item-details";
import Record from "../../record/record";

import './starships-page.css'

export default class StarshipsPage extends React.Component {

    state = {
        starships: [],
        itemId: null
    }

    swapiService = new SwapiService();

    componentDidMount() {
        this.swapiService.getAllStarships()
            .then((starships) => {
                this.setState({
                    starships
                })
            })
    }

    onSelected = (id) => {
        this.setState({
            itemId: id[1]
        })
    }

    getData = () => {
        return this.swapiService.getStarship(this.state.itemId)
    }

    render() {
        const {starships, itemId} = this.state;
        return (
            <div className='people-page'>
                <ItemList list={starships} onSelected={this.onSelected}/>

                <ItemDetails list={starships} itemId={itemId} getData={this.getData} getImageUrl={this.swapiService.getStarshipImage}>
                    <Record field="name" label="Model: "/>
                    <Record field="length" label="Length: "/>
                    <Record field="cost_in_credits" label="Cost: "/>
                </ItemDetails>
            </div>
        )
    }
}