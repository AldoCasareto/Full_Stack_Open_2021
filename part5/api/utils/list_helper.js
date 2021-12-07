import Blog from '../models/blog.js';
import User from '../models/user.js';

export const dummy = (blogs) => {
  if (blogs.length === 0) {
    return 1;
  } else {
    return 1;
  }
};

export const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

export const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  }, 0);
  return favorite;
};

export const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const authorsCount = {};

  if (blogs.length === 0) {
    return 0;
  }

  authors.forEach((author) => {
    if (authorsCount[author]) {
      authorsCount[author]++;
    } else {
      authorsCount[author] = 1;
    }
  });
  const max = Math.max(...Object.values(authorsCount));
  const author = Object.keys(authorsCount).find(
    (key) => authorsCount[key] === max
  );
  return { author, blogs: max };
};

export const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    const likes = blogs.reduce((like, blog) => {
      like[blog.author] = (like[blog.author] || 0) + blog.likes;
      return like;
    }, {});
    const maxLikes = Math.max(...Object.values(likes));
    const mostLiked = Object.keys(likes).filter(
      (author) => likes[author] === maxLikes
    );

    return { author: mostLiked[0], likes: maxLikes };
  }
};

export const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

export const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};
