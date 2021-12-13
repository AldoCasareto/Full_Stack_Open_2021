import anecdoteService from '../services/anecdoteService';

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'ADD_ANECDOTE':
      console.log(action.data);
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      console.log(action.data);
      return action.data;
    case 'VOTE':
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    default:
      return state;
  }
};

export const createAnecdote = (content) => {
  console.log(content);
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    console.log();
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const votes = await anecdoteService.updateVote(id);
    dispatch({
      type: 'VOTE',
      data: votes,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    console.log(anecdotes);
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;
