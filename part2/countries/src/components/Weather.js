import React from 'react';

const Weather = ({ weather, capital }) => {
  const { current } = weather;

  return (
    <div>
      <h1>Weather in {capital}</h1>
      {weather ? (
        <div>
          <p>
            <strong>temperature</strong> celcius
          </p>
          <img src={current.weather_icons[0]} alt='' />
          <p>
            <strong>wind:</strong> {weather.windspeed}mph {current.wind_dir}
          </p>
        </div>
      ) : (
        <p>Fetching weather</p>
      )}
    </div>
  );
};

export default Weather;
