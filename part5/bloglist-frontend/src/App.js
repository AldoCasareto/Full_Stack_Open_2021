import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const blogFormsRef = useRef();

  const notification = (message, type) => {
    setNotifications({ message, type });
    setTimeout(() => {
      setNotifications(null);
    }, 5000);
  };

  const addBlog = async (blogObject) => {
    blogFormsRef.current.toggleVisibility();
    console.log('received to create', blogObject);
    try {
      const response = await blogService.create(blogObject);
      setBlogs(blogs.concat(response));
      console.log('blog created', response);

      notification(
        `a new blog ${response.title} by ${response.author} added`,
        'success'
      );
    } catch (exception) {
      console.log(exception.response.error);
      notification(`${exception.response.error}`, 'error');
    }
  };

  const deleteBlog = (blogObject) => {
    if (
      window.confirm(`remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      blogService
        .deleteBlog(blogObject.id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
          notification(`blog ${blogObject.title} deleted`, 'success');
        })
        .catch((error) => {
          notification(`blog ${blogObject.title} not deleted`, error);
        });
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
      const response = await blogService.updateBlog(id, updatedBlog);
      console.log('updated blog', response);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response)));
    } catch (exception) {
      notification(`blog ${blog.title} not updated`, 'error');
    }
  };

  const blogForm = () => {
    return (
      <Toggable ref={blogFormsRef} buttonLabel='create new blog'>
        <BlogForm createBlog={addBlog} deleteBlog={deleteBlog} />
      </Toggable>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notification('wrong credentials', 'error');
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
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification notifications={notifications} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            {user.name} logged in
            <button id='logout' onClick={handleLogout}>
              logout
            </button>
            {blogForm()}
          </div>
        </div>
      )}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            user={user}
            key={blog.id}
            blog={blog}
            deleteBlog={deleteBlog}
            blogUpdate={blogUpdate}
          />
        ))}
    </div>
  );
};

export default App;
