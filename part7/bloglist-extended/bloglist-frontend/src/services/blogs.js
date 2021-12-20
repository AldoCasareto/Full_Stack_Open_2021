import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  console.log(newObject);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const updateBlog = async (id, newObject) => {
  console.log(id, newObject);
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  console.log(response.data);
  return response.data;
};

const newComment = async (id, comment) => {
  console.log(id, comment);
  console.log(comment);

  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  console.log(response.data);
  return response.data;
};

export default { getAll, setToken, create, deleteBlog, updateBlog, newComment };
