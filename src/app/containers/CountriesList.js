import React, { Component } from 'react';
import { countryService } from '../../services/countryService';
import CountryItem from '../components/CountryItem';
import "./CountriesList.css";

class CountriesList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            countries: [],
            errorMessage: ""
        }

        this.showCountries = this.showCountries.bind(this);
    }

    componentDidMount() {
        countryService.fetchAllCountries()
            .then(response => {
                this.setState({
                    countries: response,
                })
            })    
            .catch((error) => {
                this.setState({
                    errorMessage: error
                });
            });
    }

    showCountries(countries) {
        if (!countries) {
            return <div>Loading</div>
        }
        return countries.map(country => (<CountryItem key={country.name} country={country} />))
    }


    render() {
        const { countries } = this.state;
        // // const countries = this.state.countries; MOZE I OVAKO OVO IZNAD DA SE NAPISE


        //drugi nacin prikazivanja propertija iz stejta
            // let displayCountries = <div>Loading</div>
            // if (!countries) {
            //     return displayCountries;
            // }

            // displayCountries = countries.map(country => {
            //     return <CountryItem key={country.name} country={country} />
            // });
        return (
            <div>
                <ul id="all-countries-list">
                    {/* {displayCountries} */}
                    {countries.length === 0 ? "Loading" : this.showCountries(countries)}
                </ul>
                <div>
                    {this.state.errorMessage !== "" ? "Couldn't load countries" : ""}
                </div>
            </div>
        );
    }
}

export default CountriesList;