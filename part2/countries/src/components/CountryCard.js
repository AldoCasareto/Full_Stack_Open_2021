import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from './Weather';

const CountryCard = ({ country }) => {
  const [weather, setWeather] = useState('');
  const { capital, name, population, languages, flag } = country;

  const API_KEY = process.env.REACT_APP_API_KEY;

  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`;

  useEffect(() => {
    const fetchWeather = async () => {
      axios.get(url).then((res) => {
        const weather = res.data;
        console.log(weather);
        setWeather(weather);
      });
    };
    fetchWeather();
  }, []);

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <ul>
        <li>
          {languages.map((language) => (
            <li key={language.nativeName}>{language.name}</li>
          ))}
        </li>
        <img src={flag} alt='' width='200' />
      </ul>
      <Weather weather={weather} capital={capital} />
    </div>
  );
};

export default CountryCard;
