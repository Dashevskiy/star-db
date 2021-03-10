import React from 'react';

const ItemList = ({list,onSelected}) => {

    const eachPerson = list.map((person) => {
        const id = person.url.match(/\/([0-9]*)\/$/)
        return <li key={id} onClick={()=>onSelected(id)}>{person.name}</li>
    })

    return (
        <ul>
            {eachPerson}
        </ul>
    )
}

export default ItemList;