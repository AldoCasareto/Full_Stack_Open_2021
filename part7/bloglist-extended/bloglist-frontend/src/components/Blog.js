import React from 'react';
import Button from '@material-ui/core/Button';
import CommentForm from './CommentForm';

const Blog = ({ blog, deleteBlog, blogUpdate, user }) => {
  if (!blog) {
    return null;
  }

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

  return (
    <div id='blogContainer'>
      <div style={blogStyle} className='blogRender'>
        <span id='renderedHeader'>
          <h1>
            {blog.title} {blog.author}
          </h1>
        </span>
        <div>
          <p>{blog.url}</p>
          <div>
            {blog.likes} likes
            <Button id='like' onClick={likeHandler}>
              like
            </Button>
            <p>added by {blog.user.name}</p>
          </div>
          {user?.username === blog.user.username && (
            <Button
              color='secondary'
              id='delete'
              onClick={() => deleteBlog(blog)}
            >
              delete
            </Button>
          )}
        </div>
      </div>
      <CommentForm blog={blog} />
    </div>
  );
};

export default Blog;
