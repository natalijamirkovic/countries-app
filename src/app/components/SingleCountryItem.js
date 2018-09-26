import React from 'react';
import "./SingleCountryItem.css";
import CountryMap from './CountryMap';

const SingleCountryItem = (props) => {

    const mapItems = (items) => {
        if (items.length === 0) {
            return <div> No info available </div>
        }
        return items.map((item) => {
            return <li key={item}>- {item} </li>
        })
    }

    const checkString = (string) => {
        return string ? string : "No info available"
    }

    const { name, domain, nameCode, callingCode, capital, region, subregion, population, timezone, borders, nativeName, currencies, languages, translations, flag, regionalBlocs } = props.country;

    const trans = translations.split(", ");

    return (
        <div id="single-country-container">
            <h1> {name}</h1>
            <div id="image-map-wrapper">
                <div className="flag">
                    <img src={flag} alt={name} />
                </div>
                <CountryMap map={props.country.map} name={props.country.name} />
            </div>
            <div className="info-wrapper">
                <div className="info-wrapper-info">
                    <div>
                        <h3> Native name</h3>
                        <p>  {checkString(nativeName)}</p>
                        <h3> Capital city</h3>
                        <p> {checkString(capital)}</p>
                        <h3> Calling code</h3>
                        <ul> {mapItems(callingCode)}</ul>
                        <h3> Name code</h3>
                        <p>  {checkString(nameCode)}</p>
                        <h3> Timezone </h3>
                        <ul> {mapItems(timezone)}</ul>
                        <h3>  Domain</h3>
                        <ul> {mapItems(domain)}</ul>

                        <h3> Currencies </h3>
                        <ul>  {mapItems(currencies)}</ul>
                        <h3>  Languages</h3>
                        <ul>
                            {mapItems(languages)}
                        </ul>
                        <h3> Population </h3>
                        <p> {checkString(population)}</p>
                    </div>
                    <div>
                        <h3>Pronunciation</h3>
                        <ul> {mapItems(trans)}</ul>
                    </div>
                </div>
                <div className="region">
                    <h3>  Region</h3>
                    <p>{checkString(region)}</p>
                    <h3>  Subregion</h3>
                    <p> {checkString(subregion)}</p>
                    <h3>  Regional blocs</h3>
                    <ul>   {mapItems(regionalBlocs)}</ul>
                    <h3 > Borders </h3>
                    <ul>
                        {mapItems(borders)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SingleCountryItem;