import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from './partials/Header';
import Footer from './partials/Footer';
import SingleCountry from './containers/SingleCountry';
import Home from './containers/Home';
import Quiz from './containers/Quiz';
import CountriesList from './containers/CountriesList';


class App extends Component {
  render() {

    return (
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/countries/:name" component={SingleCountry} />
            <Route path="/countries" component={CountriesList} />
            <Route path="/quiz" component={Quiz} />
            <Redirect from="/" to="/home" />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
