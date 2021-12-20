import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import blogReducer from './reducers/blogReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import usersReducers from './reducers/usersReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  notifications: notificationReducer,
  user: userReducer,
  users: usersReducers,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
