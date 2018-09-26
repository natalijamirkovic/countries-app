import { allCountriesEndpoint, countryNameEndpoint, regionEndpoint, capitalEndpoint } from '../shared/constants';
import { Country } from "../entities/Country";
import axios from "axios";

class CountryService {

    fetchAllCountries() {
        return axios.get(allCountriesEndpoint)
            .then(res => mapListOfCountries(res))
                // console.log(res.data);
             
    }

    fetchSingleCountry(countryName) {
        return axios.get(`${countryNameEndpoint}${countryName}`)
            .then(res => mapCountries(res));
                // console.log(res.data);
                // return res.data.map(country => {
                //     const name = country.name;
                //     const domain = mapArray(country.topLevelDomain);
                //     const nameCode = country.alpha3Code;
                //     const callingCode = mapArray(country.callingCodes);          
                //     const capital = country.capital;
                //     const region = country.region;
                //     const subregion = country.subregion;
                //     const population = country.population;
                //     const map = {
                //         lat:country.latlng[0],
                //         lng:country.latlng[1]
                //     }
                //     const timezone = mapArray(country.timezones);                    
                //     const borders = mapArray(country.borders);
                //     const nativeName = country.nativeName;
                //     const currencies = mapCurrencies(country.currencies);
                //     const languages = mapLanguages(country.languages);
                //     const translations = mapTranslations(country.translations);
                //     const flag = country.flag;
                //     const regionalBlocs = mapBlocks(country.regionalBlocs);
                //     const myCountry = new Country(name, domain, nameCode, callingCode, capital, region, subregion, population, map, timezone, borders, nativeName, currencies, languages, translations, flag, regionalBlocs);
                //     console.log(myCountry);
                //     return myCountry;
                // });   
    }

    fetchRegion(regionName) {
        return axios.get(`${regionEndpoint}${regionName}`)
        .then(res => mapListOfCountries(res));
    }

    fetchSearchedCountry(countryName) {
        return axios.get(`${countryNameEndpoint}${countryName}`)
        .then(res => mapListOfCountries(res));
    }

    fetchCapital(capital) {
        return axios.get(`${capitalEndpoint}${capital}`)
        .then(res => mapListOfCountries(res));
    }
}

const mapListOfCountries = res => {
    return res.data.map(country => {
        const name = country.name;
        const flag = country.flag;
        const myCountry = {
            name,
            flag
        }

        return myCountry;
    });
}

const mapCountries = (res) => {
    return res.data.map(country => {
        const name = country.name;
        const domain = mapArray(country.topLevelDomain);
        const nameCode = country.alpha3Code;
        const callingCode = mapArray(country.callingCodes);          
        const capital = country.capital;
        const region = country.region;
        const subregion = country.subregion;
        const population = country.population;
        const map = {
            lat:country.latlng[0],
            lng:country.latlng[1]
        }
        const timezone = mapArray(country.timezones);                    
        const borders = mapArray(country.borders);
        const nativeName = country.nativeName;
        const currencies = mapCurrencies(country.currencies);
        const languages = mapLanguages(country.languages);
        const translations = mapTranslations(country.translations);
        const flag = country.flag;
        const regionalBlocs = mapBlocks(country.regionalBlocs);
        const myCountry = new Country(name, domain, nameCode, callingCode, capital, region, subregion, population, map, timezone, borders, nativeName, currencies, languages, translations, flag, regionalBlocs);
        // console.log(myCountry);
        return myCountry;
    });   
}

const mapArray =(array) => {
    return array.map(element => {
        return element;
    })
}

const mapCurrencies =(array) => {
    return array.map(element => {
        return `${element.name}, ${element.code}`;
    })
}

const mapLanguages =(array) => {
    return array.map(element => {
        return `${element.name}, ${element.nativeName}`;
    })
}

const mapTranslations = (element) => {
        return `brazilian:  ${element.br}, german:  ${element.de}, spanish:  ${element.es}, farsi:  ${element.fa}, french:  ${element.fr}, croatian:  ${element.hr}, italian:  ${element.it}, japanese:  ${element.ja}, dutch:  ${element.nl}, portuguese:  ${element.pt}`;
}

const mapBlocks =(array) => {
    return array.map(element => {
        return `${element.name}, ${element.acronym}`;
    })
}

// const mapArray = array => array.map(element => element)

export const countryService = new CountryService();