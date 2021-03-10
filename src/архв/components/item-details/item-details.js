import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './item-details.css';
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button/error-button";

export default class ItemDetails extends Component {

    swapiService = new SwapiService()

    state = {
        id: 1,
        item: {},
        image: null
    }
    static propTypes = {
        id: PropTypes.number,
        item: PropTypes.object,
        itemId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        getData: PropTypes.func
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        this.updateItem()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemId !== this.props.itemId) {
            this.updateItem()
        }
    }

    updateItem = () => {
        const {itemId, getData, getImageUrl} = this.props;
        getData(itemId)
            .then((item) => {
                if (this._isMounted) {
                    this.setState({
                        item,
                        id: itemId,
                        image: getImageUrl(itemId)
                    })
                }
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {item, name, image} = this.state;

        return (
            <div className="person-details card">
                <img className="person-image"
                     alt='img'
                     src={image}/>

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item});
                            })
                        }
                    </ul>
                </div>
                <ErrorButton/>
            </div>
        )
    }
}