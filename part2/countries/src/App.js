import axios from 'axios';
import { useEffect, useState } from 'react';
import Countries from './components/Countries';
import Filter from './components/Filter';
import data from './users.json';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const fetchCountries = async () => {
    await axios.get('https://restcountries.com/v2/all').then((res) => {
      setCountries(res.data);
    });
  };


  console.log(countries);

  const filterSearch = !search
    ? countries
    : countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );



  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <Filter search={search} handleSearch={handleSearch} />
      <Countries countries={filterSearch} handleSearch={handleSearch} />
    </div>
  );
}

export default App;
