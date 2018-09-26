import React from 'react';
import { Link } from "react-router-dom";
import "./CountryItem.css";

const CountryItem = (props) => {

    const { name, flag } = props.country;

    return (
        <li className="country-item">
            <Link to={"/countries/" + name} >
                <div>
                    <img src={flag} alt={name} />
                </div>
                <p>{name}</p>
            </Link>
        </li>
    );
};

export default CountryItem;