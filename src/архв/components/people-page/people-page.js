import React, {Component} from 'react'
import PropTypes from "prop-types";

import ItemList from "../item-list/item-list";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ErrorBoundry from "../error-boundry/error-boundry";
import ItemDetails from "../item-details/item-details";
import Record from "../record/record";

export default class PeoplePage extends Component {
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
/*
    componentDidMount() {
        this.setState({
            itemId: this.props.itemId
        })
    }
*/
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
        return this.swapiSerice.getPerson(this.state.itemId)
    }

    render() {
        const {itemId, hasError} = this.state;

        if (hasError) {
            return <ErrorIndicator/>
        }

        if (!itemId) {
            return <Row left={<ItemList
                onItemSelectedId={this.onItemSelectedId}
                getData={this.swapiSerice.getAllPeople}
            />} right={<span>Select a item from a list</span>}/>
        }

        const itemList = (
            <ErrorBoundry>
                <ItemList
                    onItemSelectedId={this.onItemSelectedId}
                    getData={this.swapiSerice.getAllPeople}
                />
            </ErrorBoundry>
        )

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails
                    itemId={itemId}
                    getData={this.getData}
                    getImageUrl={this.swapiSerice.getPersonImage}>

                    <Record field="name" label="Name: "/>
                    <Record field="birth_year" label="Birth Year: "/>
                    <Record field="gender" label="Gender: "/>
                </ItemDetails>
            </ErrorBoundry>
        )
        return (
            <Row left={itemList} right={personDetails}/>
        )
    }
}