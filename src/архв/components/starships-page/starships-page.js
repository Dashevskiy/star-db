import React, {Component} from 'react'
import PropTypes from "prop-types";

import ItemList from "../item-list/item-list";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ItemDetails from "../item-details/item-details";
import Record from "../record/record";
import ErrorBoundry from "../error-boundry/error-boundry";

export default class StarshipsPage extends Component {
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
            if (this.props.starshipId) {
                this.setState({
                    itemId: this.props.starshipId
                })
            }
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
        return this.swapiSerice.getStarship(this.state.itemId)
    }

    /*
            componentDidUpdate(prevProps, prevState, snapshot) {
                if (prevProps.starshipId !== this.props.starshipId) {
                    console.log(this.state.itemId)
                    console.log(this.props.starshipId)
                    this.setState({
                        itemId: this.props.starshipId
                    })
                }
                console.log(this.state.itemId)
                console.log(this.props.starshipId)
            }*/

    render() {
        const {itemId, hasError} = this.state;
        //  const {starshipId} = this.props;

        if (hasError) {
            return <ErrorIndicator/>
        }

        if (!itemId) {
            return <Row left={<ItemList
                onItemSelectedId={this.onItemSelectedId}
                getData={this.swapiSerice.getAllStarships}
            />} right={<span>Select a item from a list</span>}/>
        }

        const itemList = (
            <ErrorBoundry>
                <ItemList
                    onItemSelectedId={this.onItemSelectedId}
                    getData={this.swapiSerice.getAllStarships}
                />
            </ErrorBoundry>
        )

        const starshipDetails = (
            <ErrorBoundry>
                <ItemDetails
                    itemId={itemId}
                    getData={this.getData}
                    getImageUrl={this.swapiSerice.getStarshipImage}>

                    <Record field="name" label="Model: "/>
                    <Record field="length" label="Length: "/>
                    <Record field="cost_in_credits" label="Cost: "/>
                </ItemDetails>
            </ErrorBoundry>
        )
        return (
            <Row left={itemList} right={starshipDetails}/>
        )
    }
}
