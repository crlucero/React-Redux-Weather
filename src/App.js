import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import WeatherDetails from './components/WeatherDetails';

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { locationReducer } from './reducers/index';
const API_KEY = "21338c2f2a104e28a7a2fcfc5413b588";


const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      state = action.payload;
      break;
    case "SUBTRACT":
      state = state - action.payload;
      break
  }
  return state;
}

const store = createStore(reducer, "seattle")
store.subscribe(() => {
  console.log("Store updated", store.getState());

})



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'Seattle',
      weather: {},
      weatherDetails: {}
    }
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
  }








  fetchWeather() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      let url =
        `https://api.weatherbit.io/v2.0/current?city=${this.state.location}&key=` + API_KEY

      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }

  handleChangeLocation(newLocation) {
    console.log(newLocation);
    this.state.location = newLocation;
    this.setState({ location: newLocation })
    console.log(this.state)
    let promise = this.fetchWeather();
    promise.then(response => {
      let data = JSON.parse(response);
      console.table(data.data[0]);
      this.setState({
        weather: data.data[0]
      });
      this.setState({
        weatherDetails: data.data[0].weather
      });
    });

  }

  render() {
    return (
      <Provider store={store}>

        <div className="App" >
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Weather App</h1>
          </header>
          <Search changeLocation={this.handleChangeLocation} />
          <WeatherDetails details={this.state.weatherDetails} weather={this.state.weather} />
        </div>
      </Provider>
    );
  }
}

export default App;
