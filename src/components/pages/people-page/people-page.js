import React from 'react';
import SwapiService from "../../../services/swapi-service";
import ItemList from "../../item-list/item-list";
import ItemDetails from "../../item-details/item-details";

import './people-page.css'
import Record from "../../record/record";

export default class PeoplePage extends React.Component {

    state = {
        people: [],
        itemId: null
    }

    swapiService = new SwapiService();

    componentDidMount() {
        this.swapiService.getAllPeople()
            .then((people) => {
                this.setState({
                    people
                })
            })
    }

    onSelected = (id) => {
        this.setState({
            itemId: id[1]
        })
    }

    getData = () => {
        return this.swapiService.getPerson(this.state.itemId)
    }

    render() {
        const {people, itemId} = this.state;
        return (
            <div className='people-page'>
                <ItemList list={people} onSelected={this.onSelected}/>
                <ItemDetails list={people} itemId={itemId} getData={this.getData} getImageUrl={this.swapiService.getPersonImage}>

                    <Record field="name" label="Name: "/>
                    <Record field="birth_year" label="Birth Year: "/>
                    <Record field="gender" label="Gender: "/>
                </ItemDetails>
            </div>
        )
    }
}