import React from 'react';

const Anecdote = (anecdoteById) => {
  console.log(anecdoteById);
  const { author, content, votes } = anecdoteById.anecdote;

  return (
    <div>
      <h2> {author} </h2>
      <p> {content} </p>
      <p> has {votes} votes </p>
    </div>
  );
};

export default Anecdote;
