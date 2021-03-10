import React from 'react';
import './item-list.css';

const ItemList = ({list,onSelected}) => {

    const eachPerson = list.map((person) => {
        const id = person.url.match(/\/([0-9]*)\/$/)
        return <li className="list-group-item" key={id} onClick={()=>onSelected(id)}>{person.name}</li>
    })

    return (
        <ul className="item-list list-group">
            {eachPerson}
        </ul>
    )
}

export default ItemList;