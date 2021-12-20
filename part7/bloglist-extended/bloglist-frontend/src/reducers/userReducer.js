import blogService from '../services/blogs';
import loginService from '../services/login';

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};

export const setUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
  if (loggedUserJSON) {
    const loggedUser = JSON.parse(loggedUserJSON);
    blogService.setToken(loggedUser.token);
    return {
      type: 'SET_USER',
      data: loggedUser,
    };
  }
  return { type: 'LOGOUT' };
};

export const userLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser');
  return { type: 'LOGOUT' };
};

export const userLogin = (username, password) => {
  console.log(username, password);
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser());
  };
};

export default userReducer;
