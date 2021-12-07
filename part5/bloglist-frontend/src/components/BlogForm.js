import React, { useState } from 'react';

const initialState = {
  title: '',
  author: '',
  url: '',
};

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState(initialState);

  const handleNewBlog = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });
    setNewBlog(initialState);
  };

  return (
    <div>
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            title
            <input
              id='title'
              type='text'
              value={newBlog.title}
              onChange={handleNewBlog}
              name='title'
              className='title'
            />
          </div>
          <div>
            author
            <input
              id='author'
              type='text'
              value={newBlog.author}
              name='author'
              onChange={handleNewBlog}
              className='author'
            />
          </div>
          <div>
            url
            <input
              id='url'
              type='text'
              value={newBlog.url}
              name='url'
              onChange={handleNewBlog}
              className='url'
            />
          </div>
          <button id='create' type='submit'>
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
