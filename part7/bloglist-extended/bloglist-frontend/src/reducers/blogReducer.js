/* eslint-disable indent */
import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      console.log(action);
      return action.data;
    case 'CREATE_BLOG':
      console.log(action.data);
      return [...state, action.data];
    case 'LIKE_BLOG': {
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    }
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.id);
    case 'NEW_COMMENT': {
      console.log(action.data);
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    }
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOG',
      data: blogs,
    });
  };
};

export const createBlog = (blogObject) => {
  console.log(blogObject);
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    console.log(newBlog);
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog,
    });
  };
};

export const blogDelete = async (id) => {
  console.log(id);
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(blog.id, blog);
    console.log(updatedBlog);
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog,
    });
  };
};

export const addComment = (id, comment) => {
  console.log(id, comment);
  return async (dispatch) => {
    const updatedBlog = await blogService.newComment(id, comment);
    console.log(updatedBlog);
    dispatch({
      type: 'NEW_COMMENT',
      data: updatedBlog,
    });
  };
};

export default blogReducer;
