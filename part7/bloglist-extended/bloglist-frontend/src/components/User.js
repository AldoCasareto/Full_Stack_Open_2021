import React from 'react';

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  console.log('user', user);
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.length === 0 ? 'No Blogs' : blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
