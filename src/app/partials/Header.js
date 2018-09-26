import React from 'react';
import { Link } from "react-router-dom";
import "./Partials.css";

const Header = (props) => {

    return (
        <header>
            <h1>Countries App</h1>
            <ul>
                <Link to="/home">Home </ Link>
                <Link to="/countries">Countries </ Link>
                <Link to="/quiz">Geo Quiz </ Link>
            </ul>
        </header>
    );
};

export default Header;