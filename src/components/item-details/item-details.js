import React from 'react';
import './item-details.css'
import SwapiService from "../../services/swapi-service";

export default class ItemDetails extends React.Component {

    swapiService = new SwapiService();

    state = {
        id: null,
        item: null,
        image: null
    }


    componentDidMount() {
        this.updateItem()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemId !== this.props.itemId) {
            this.updateItem()
        }
    }

    updateItem = () => {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    id: itemId,
                    image: getImageUrl(itemId)
                })
            })
    }


    render() {
        const {name, item, image} = this.state;

        if (item===null) {
            return <span>Select a item from a list</span>;
        }

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
            </div>
        )
    }
}
