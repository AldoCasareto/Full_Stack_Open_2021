import React, { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import About from './components/About';
import Anecdote from './components/Anecdote';
import AnecdoteList from './components/AnecdoteList';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Menu from './components/Menu';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const matchAnecdote = useRouteMatch('/anecdotes/:id');

  const anecdoteById = matchAnecdote
    ? anecdotes.find((a) => a.id === matchAnecdote.params.id)
    : null;

  console.log(anecdoteById);
  console.log(matchAnecdote);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && (
        <div style={{ border: 'solid 5px red' }}>{notification}</div>
      )}
      <Switch>
        <Route exact path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdoteById} />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
