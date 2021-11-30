import React from 'react';
import CountryCard from './CountryCard';

const Countries = ({ countries, handleSearch }) => {
  console.log(countries);

  if (countries.length === 1) {
    return <CountryCard country={countries[0]} />;
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <div>
            <span>{country.name}</span>
            <button value={country.name} onClick={handleSearch}>
              Show
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return <p>Too many records</p>;
  }
};

export default Countries;
