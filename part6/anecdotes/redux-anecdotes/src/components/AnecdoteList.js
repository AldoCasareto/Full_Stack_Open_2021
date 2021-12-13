import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {
  // const dispatch = useDispatch();
  // const anecdotes = useSelector((state) => state.anecdotes);
  // const filterAnecdotes = useSelector((state) => state.filter);

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote);
    props.showNotification(`You voted '${anecdote.content}'`, 5);

    // const vote = (anecdote) => {
    //   console.log(anecdote);
    //   dispatch(voteAnecdote(anecdote));
    //   dispatch(
    //     showNotification(`You voted for anecdote: ${anecdote.content}`, 5)
    //   );
  };
  console.log(props.anecdotes);

  return (
    <div>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  console.log(state.filter);
  if (state.filter) {
    console.log(state.filter);
    console.log(state.anecdotes);
    return {
      anecdotes: state.anecdotes.filter((anecdote) =>
        anecdote.content?.toLowerCase().includes(state.filter.toLowerCase())
      ),
    };
  }
  return { anecdotes: state.anecdotes };
};

const mapDispatchToProps = { voteAnecdote, showNotification };

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
