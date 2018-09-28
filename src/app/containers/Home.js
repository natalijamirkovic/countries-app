import React, { Component } from 'react';
import { countryService } from '../../services/countryService';
import CountryItem from '../components/CountryItem';
import "./Home.css";

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            region: false,
            country: false,
            capital: false,
            regionOptions: false,
            inputValue: "",
            errorMessage: "",
            selectError: false
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTypeOfSearch = this.handleTypeOfSearch.bind(this);
        this.renderResults = this.renderResults.bind(this);
    }

    handleSearch(e) {
        if (e.target.value === "") {
            console.log("Bjdska");
            this.setState({
                errorMessage: ""
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleTypeOfSearch(e) {
        if (e.target.value === "region") {
            this.setState({
                [e.target.value]: true,
                country: false,
                capital: false,
                regionOptions: true
            });
        }
        if (e.target.value === "country") {
            this.setState({
                [e.target.value]: true,
                region: false,
                capital: false,
                regionOptions: false,
            });
        }
        if (e.target.value === "capital") {
            this.setState({
                [e.target.value]: true,
                region: false,
                country: false,
                regionOptions: false,

            });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const { region, country, capital, inputValue } = this.state;
        if (!region && !country && !capital) {
            this.setState({
                selectError: true
            })

        }
        if (region === true) {
            countryService.fetchRegion(inputValue)
                .then(res => {
                    this.setState({
                        results: res,
                        inputValue: "",
                        selectError: false,
                        regionOptions: false,
                    });
                })
                .catch((error) => {
                    this.setState({
                        errorMessage: error,
                        selectError: false,
                        regionOptions: false,
                    });
                });
        }

        if (country === true) {
            countryService.fetchSearchedCountry(inputValue)
                .then(res => {
                    this.setState({
                        results: res,
                        inputValue: "",
                        selectError: false
                    });
                })
                .catch((error) => {
                    this.setState({
                        errorMessage: error,
                        selectError: false
                    });
                });
        }

        if (capital === true) {
            countryService.fetchCapital(inputValue)
                .then(res => {
                    this.setState({
                        results: res,
                        inputValue: "",
                        selectError: false
                    });
                })
                .catch((error) => {
                    this.setState({
                        errorMessage: error,
                        selectError: false
                    });
                });
        }
    }

    renderResults(results) {

        if (results.length === 0) {
            return <div>"No searched results"</div>
        }
        return results.map((r) => {
            return <CountryItem key={r.name} country={r} />
        });
    }

    render() {

        const { regionOptions, results, selectError } = this.state;
        return (
            <div className="home-container">
                <h1>Please select type of search</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-wrapper">
                        <label> <input type="radio" name="search" value="region" onClick={this.handleTypeOfSearch} /> Region </label>
                        <label><input type="radio" name="search" value="country" onClick={this.handleTypeOfSearch} /> Country </label>
                        <label><input type="radio" name="search" value="capital" onClick={this.handleTypeOfSearch} /> Capital City </label>
                    </div>
                    <input type="text" name="inputValue" placeholder="search" onChange={this.handleSearch} value={this.state.inputValue} id="search" />
                    <p>{regionOptions ? "Search by region: Africa, Americas, Asia, Europe, Oceania" : ""}</p>
                    <p className={selectError ? "error-red" : ""}>{selectError ? "*Please select type of search" : ""}</p>
                </form>
                <div id="bg-img">
                    <ul id="all-countries-list">
                        {!results ? "" : this.renderResults(results)}
                    </ul>
                </div>
                <div>
                    {this.state.errorMessage !== "" ? "No results" : ""}
                </div>
            </div>
        );
    }
}

export default Home;