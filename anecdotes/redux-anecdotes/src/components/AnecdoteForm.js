import React from 'react';
// import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const Anecdotes = (props) => {
  // const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    // dispatch(createAnecdote(content));
    // dispatch(showNotification(`you created: ${content}`, 5));
    props.createAnecdote(content);
    props.showNotification(`you created: ${content}`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  showNotification,
};

export default connect(null, mapDispatchToProps)(Anecdotes);
