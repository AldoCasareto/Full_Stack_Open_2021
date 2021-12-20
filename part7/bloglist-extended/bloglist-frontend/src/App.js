import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';

import {
  initializeBlogs,
  createBlog,
  likeBlog,
  blogDelete,
} from './reducers/blogReducer';
import {
  setNotificationSuccess,
  setNotificationError,
} from './reducers/notificationReducer';
import { userLogin, userLogout, setUser } from './reducers/userReducer';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';

import { initializeUsers } from './reducers/usersReducer';
import Navigation from './components/Navigation';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormsRef = useRef();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const notifications = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const addBlog = async (blogObject) => {
    blogFormsRef.current.toggleVisibility();
    try {
      dispatch(createBlog(blogObject));
      dispatch(
        setNotificationSuccess(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      );
    } catch (exception) {
      dispatch(setNotificationError('Blog was not created'));
    }
  };

  const deleteBlog = (blogObject) => {
    console.log('deleteobject', blogObject);
    console.log('deleteobject', blogObject.id);

    if (
      window.confirm(`remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      try {
        dispatch(blogDelete(blogObject.id));
        dispatch(
          setNotificationSuccess(
            `${blogObject.title} by ${blogObject.author} removed`
          )
        );
      } catch (error) {
        dispatch(setNotificationError('Blog was not removed'));
      }
    }
  };

  const blogUpdate = async (id, blogObject) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = {
      ...blogObject,
      user: blogObject.user.id,
    };
    console.log('received to update', updatedBlog);
    try {
      dispatch(likeBlog(updatedBlog));
      dispatch(
        setNotificationSuccess(`${blog.title} by ${blog.author} was liked`)
      );
    } catch (exception) {
      dispatch(setNotificationError(`blog ${blog.title} not updated`));
    }
  };

  const blogForm = () => {
    return (
      <Toggable ref={blogFormsRef} buttonLabel='create new blog'>
        <BlogForm createBlog={addBlog} deleteBlog={deleteBlog} />
      </Toggable>
    );
  };

  const blogStyle = {
    margin: 5,
    paddingTop: 10,
    border: '0.5px solid',
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      dispatch(userLogin(username, password));
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotificationError('wrong credentials', 'error'));
    }
  };

  const loginForm = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    );
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const matchIDUsers = useRouteMatch('/users/:id');
  const userByID = matchIDUsers
    ? users.find((user) => user.id === matchIDUsers.params.id)
    : null;

  const matchIDBlogs = useRouteMatch('/blogs/:id');
  const blogByID = matchIDBlogs
    ? blogs.find((blog) => blog.id === matchIDBlogs.params.id)
    : null;

  return (
    <div>
      <Navigation user={user} handleLogout={handleLogout} />
      <h2>blogs</h2>
      <Notification notifications={notifications} />
      <Switch>
        <Route exact path='/'>
          {user === null ? loginForm() : blogForm()}
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <div style={blogStyle} key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
              </div>
            ))}
        </Route>
        <Route path='/blogs/:id'>
          <Blog
            blogUpdate={blogUpdate}
            blog={blogByID}
            deleteBlog={deleteBlog}
            user={user}
          />
        </Route>
        <Route exact path='/users/:id'>
          <User user={userByID} />
        </Route>
        <Route path='/users'>
          <Users users={users} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
