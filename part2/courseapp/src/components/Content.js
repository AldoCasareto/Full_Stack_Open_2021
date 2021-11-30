import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      {parts.map((part) => (
        <div key={part.id} >
          <Part name={part.name} exercise={part.exercises} />
        </div>
      ))}
    </div>
  );
};

export default Content;
