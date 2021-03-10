import React, {Component} from 'react';
import PropTypes from "prop-types";

import './item-list.css';
import Spinner from "../spinner/spinner";


export default class ItemList extends Component {

    state = {
        itemList: []
    }
    static propTypes = {
        itemList: PropTypes.array,
        getData: PropTypes.func,
        onItemSelectedId: PropTypes.func
    }
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                if (this._isMounted) {
                    this.setState({
                        itemList
                    })
                }
            })
            .catch(err => console.log(err))
    }


    renderItems = (arr) => {
        return arr.map((person) => {
            const personUrl = person.url.match(/\/([0-9]*)\/$/)
            return (
                <li className="list-group-item"
                    key={personUrl[1]}
                    onClick={() => this.props.onItemSelectedId(personUrl[1])}>
                    {person.name}
                </li>
            )
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {itemList} = this.state;
        const peopleItem = this.renderItems(itemList)

        if (itemList.length < 1) {
            return <Spinner/>
        }

        return (
            <ul className="item-list list-group">
                {peopleItem}
            </ul>
        );
    }
}