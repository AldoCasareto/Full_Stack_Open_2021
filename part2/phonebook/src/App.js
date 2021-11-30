import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Messages from './components/Messages';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneService from './services/phonebook';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null);

  const fetchData = async () => {
    await phoneService.getAll().then((allNotes) => {
      setPersons(allNotes);
      console.log(allNotes);
      console.log(persons);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNameInput = {
      name: newName,
      number: newNumber,
    };

    const findMatch = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    console.log(newName);
    console.log(newNameInput);
    console.log(findMatch);

    if (findMatch) {
      const updateOnlyNum = { ...findMatch, number: newNumber };
      window.confirm(
        `${findMatch.name} is already added to phonebook. Replace old number with new one?`
      );
      phoneService
        .updateNumber(findMatch.id, updateOnlyNum)
        .then((updatedContact) =>
          setPersons(
            persons.map((person) =>
              person.id !== findMatch.id ? person : updatedContact
            )
          )
        )
        .then(() => {
          setNotification({
            message: `Number updated for ${newName}`,
            status: `success`,
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification({
            message: `Information for ${newName} has already been removed from the server`,
            status: 'error',
          });
        });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
      setNewName('');
      setNewNumber('');
      return;
    }

    phoneService.createContact(newNameInput).then((createdContact) => {
      setPersons(persons.concat(createdContact));
      setNotification({
        message: `Added ${newNameInput.name}`,
        status: 'success',
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
      setNewName('');
      setNewNumber('');
    });
  };

  const deleteContact = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const matchContact = persons.filter((person) => person.id !== id);
      setNotification({
        message: `Deleted ${name}`,
        status: 'success',
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
      phoneService.deleteContact(id).then(setPersons(matchContact));
    }
  };

  const searchMatch = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Messages notification={notification} />
      <Filter handleFilter={handleFilter} search={search} />
      <PersonForm
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons searchMatch={searchMatch} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
