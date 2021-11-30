import React from 'react'

const Persons = ({ searchMatch, deleteContact }) => {
  return (
    <div>
      <ul>
        {searchMatch.map((person) => (
          <li key={person.id}>
            {person.name}-{person.number}
            <button onClick={() => deleteContact(person.id, person.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons
