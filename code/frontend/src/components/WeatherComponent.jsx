import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";
function WeatherComponent() {
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast")
            .then((response) => response.json())
            .then((data) => {
                const forecast = data.items[0].forecasts[0];
                setCurrentWeather(forecast.forecast);
            })
            .catch((error) =>
                console.error("Error fetching weather data:", error)
            );
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <p>{currentWeather ? currentWeather : "Loading..."}</p>
            <WeatherIcon forecast={currentWeather ? currentWeather : "Loading..."}/>
        </div>
    );
}

export default WeatherComponent;
