import axios from 'axios';

const baseUrl = 'http://localhost:3015/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const createContact = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => res.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};

const updateNumber = (id, newNumber) => {
  const request = axios.put(`${baseUrl}/${id}`, newNumber);
  return request.then((res) => res.data);
};

export default { getAll, createContact, deleteContact, updateNumber };
