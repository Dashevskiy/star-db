import React from 'react';
import PropTypes from 'prop-types';

const Record = ({item, field, label}) => {

    Record.propTypes = {
        item: PropTypes.object,
        field: PropTypes.string,
        label: PropTypes.string
    }

    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export default Record;
