import React, { Component } from 'react';
import { countryService } from '../../services/countryService';
import SingleCountryItem from '../components/SingleCountryItem';
import "./SingleCountry.css";

class SingleCountry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            singleCountry: [],
            errorMessage: "",
        }
        this.showCountries = this.showCountries.bind(this)
    }

    componentDidMount() {
        countryService.fetchSingleCountry(this.props.match.params.name)
            .then(response => {
                this.setState({
                    singleCountry: response
                })
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error
                })
            })
    }

    showCountries(countries) {
        if (!countries) {
            return <div>Loading</div>
        }
        return countries.map(country => {
            return <SingleCountryItem key={country.name} country={country} />
        })
    }

    render() {

        return (
            <div>
                <ul>
                    {this.showCountries(this.state.singleCountry)}
                </ul>
                <div>
                    {this.state.errorMessage !== "" ? "Something went wrong" : ""}
                </div>
            </div>
        );
    }
}

export default SingleCountry;