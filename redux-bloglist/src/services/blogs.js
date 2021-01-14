/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
// const baseUrl = "/api/blogs";
const baseUrl = "http://localhost:3001/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (title, author, url) => {
  const object = { title, author, url, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

// const create = async (newObject) => {
//   const config = {
//     headers: { Authorization: token },
//   };

//   const response = await axios.post(baseUrl, newObject, config);
//   return response.data;
// };

const update = (id, newObject) => {
  // eslint-disable-next-line no-useless-escape
  const request = axios.put(`${baseUrl}\/${id}`, newObject);

  return request.then((response) => response.data);
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };

  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

export default { getAll, create, update, setToken, remove };
