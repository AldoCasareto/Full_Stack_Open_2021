import React from 'react';

const Total = ({ parts }) => {
  console.log(parts);
  const total = parts.reduce((sum, part, index) => sum + part.exercises, 0);
  console.log(total);

  return (
    <div>
      <p>
        <strong>total of {total} exercises </strong>
      </p>
    </div>
  );
};

export default Total;
