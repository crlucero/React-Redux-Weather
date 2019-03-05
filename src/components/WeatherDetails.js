import React, { Component } from 'react'

export default class WeatherDetails extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <h4>Location: {this.props.weather.city_name}, {this.props.weather.state_code} </h4>
                <p>Weather: {this.props.details.description}</p>
                <img src={`https://www.weatherbit.io/static/img/icons/${this.props.details.icon}.png`} />
                <p>Temperature: {this.props.weather.temp * 9 / 5 + 32} °F</p>
                <p>Feels like: {this.props.weather.app_temp * 9 / 5 + 32}°F</p>
                <p>Wind Speed: {this.props.weather.wind_spd} mph</p>
            </div>
        )
    }
}
