import React, {Component} from 'react'
import PropTypes from "prop-types";

import ItemList from "../item-list/item-list";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ItemDetails from "../item-details/item-details";
import Record from "../record/record";
import ErrorBoundry from "../error-boundry/error-boundry";


export default class PlanetsPage extends Component {
    swapiSerice = new SwapiService();

    state = {
        itemId: null,
        hasError: false
    }
    static propTypes = {
        itemId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    }
   /* componentDidMount() {
        this.setState({
            itemId: this.props.itemId
        })
    }*/

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    onItemSelectedId = (itemId) => {
        this.setState({
            itemId
        })
    }
    getData = () => {
        return this.swapiSerice.getPlanet(this.state.itemId)
    }

    render() {
        const {itemId, hasError} = this.state;

        if (hasError) {
            return <ErrorIndicator/>
        }

        if (!itemId) {
            return  <Row left={<ItemList
                onItemSelectedId={this.onItemSelectedId}
                getData={this.swapiSerice.getAllPlanets}
            />} right={<span>Select a item from a list</span>}/>
        }

        const itemList = (
            <ItemList
                onItemSelectedId={this.onItemSelectedId}
                getData={this.swapiSerice.getAllPlanets}
            />
        )
        const planetDetails = (
            <ErrorBoundry>
                <ItemDetails
                    itemId={itemId}
                    getData={this.getData}
                    getImageUrl={this.swapiSerice.getPlanetImage}>

                    <Record field="name" label="Name: "/>
                    <Record field="diameter" label="Diameter: "/>
                    <Record field="population" label="Population: "/>
                </ItemDetails>
            </ErrorBoundry>
        )

        return (
            <Row left={itemList} right={planetDetails}/>
        )
    }
}