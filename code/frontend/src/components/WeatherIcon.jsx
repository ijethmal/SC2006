import React from 'react';

function WeatherIcon({ forecast }) {
  let icon;

  switch (forecast) {
    case 'Fair':
    case 'Fair (Day)':
      icon = <span role="img" aria-label="Sunny">☀️</span>;
      break;
    case 'Fair (Night)':
      icon = <span role="img" aria-label="Moon">🌙</span>;
      break;
    case 'Fair and Warm':
      icon = <span role="img" aria-label="Sunny and Warm">☀️🌡️</span>;
      break;
    case 'Partly Cloudy':
    case 'Partly Cloudy (Day)':
      icon = <span role="img" aria-label="Partly Cloudy">🌤️</span>;
      break;
    case 'Partly Cloudy (Night)':
      icon = <span role="img" aria-label="Partly Cloudy at Night">🌙🌤️</span>;
      break;
    case 'Cloudy':
      icon = <span role="img" aria-label="Cloudy">☁️</span>;
      break;
    case 'Hazy':
    case 'Slightly Hazy':
      icon = <span role="img" aria-label="Hazy">🌫️</span>;
      break;
    case 'Windy':
      icon = <span role="img" aria-label="Windy">🌬️</span>;
      break;
    case 'Mist':
      icon = <span role="img" aria-label="Mist">🌫️</span>;
      break;
    case 'Fog':
      icon = <span role="img" aria-label="Fog">🌁</span>;
      break;
    case 'Light Rain':
      icon = <span role="img" aria-label="Light Rain">🌧️</span>;
      break;
    case 'Moderate Rain':
      icon = <span role="img" aria-label="Moderate Rain">🌧️🌧️</span>;
      break;
    case 'Heavy Rain':
      icon = <span role="img" aria-label="Heavy Rain">🌧️💧💧</span>;
      break;
    case 'Passing Showers':
      icon = <span role="img" aria-label="Passing Showers">🌦️</span>;
      break;
    case 'Light Showers':
      icon = <span role="img" aria-label="Light Showers">🌦️</span>;
      break;
    case 'Showers':
      icon = <span role="img" aria-label="Showers">🌦️🌦️</span>;
      break;
    case 'Heavy Showers':
      icon = <span role="img" aria-label="Heavy Showers">🌧️🌧️🌧️</span>;
      break;
    case 'Thundery Showers':
      icon = <span role="img" aria-label="Thundery Showers">⛈️</span>;
      break;
    case 'Heavy Thundery Showers':
      icon = <span role="img" aria-label="Heavy Thundery Showers">⛈️⚡</span>;
      break;
    case 'Heavy Thundery Showers with Gusty Winds':
      icon = <span role="img" aria-label="Heavy Thundery Showers with Gusty Winds">⛈️💨⚡</span>;
      break;
    default:
      icon = <span>Unknown Weather</span>;
  }

  return <div><h2>{icon}</h2></div>;
}

export default WeatherIcon;