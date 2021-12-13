import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

const updateVote = async (anecdote) => {
 console.log(anecdote);
  const anecdoteToUpdate = {...anecdote, votes: anecdote.votes+1}
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdoteToUpdate);
  console.log(response.data);
  return response.data;
};

const create = async (content) => {
  console.log(content);
  const anecdote = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

export default { getAll, create, updateVote };
