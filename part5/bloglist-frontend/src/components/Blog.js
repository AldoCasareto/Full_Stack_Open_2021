import React, { useState } from 'react';

const Blog = ({ blog, deleteBlog, blogUpdate, user }) => {
  const [visible, setVisible] = useState(false);

  const likeHandler = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    blogUpdate(blog.id, updatedBlog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleView = () => {
    setVisible(!visible);
  };

  return (
    <div id='blogContainer'>
      <div style={blogStyle} className='blogRender'>
        <span id='renderedHeader'>
          {blog.title} {blog.author}
        </span>
        <button className='view' onClick={handleView}>
          <span>{!visible ? 'view' : 'hide'}</span>
        </button>
        {visible && (
          <div>
            <p>{blog.url}</p>
            <div>
              {blog.likes} likes
              <button id='like' onClick={likeHandler}>
                like
              </button>
              <p>added by {blog.user.name}</p>
            </div>
            {user?.username === blog.user.username && (
              <button id='delete' onClick={() => deleteBlog(blog)}>
                delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
