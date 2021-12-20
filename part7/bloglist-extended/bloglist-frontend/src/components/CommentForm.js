import React from 'react';
import { addComment } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();

  console.log(blog.comments);

  console.log(blog.id);

  const handleComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    console.log(comment);
    event.target.comment.value = '';
    dispatch(addComment(blog.id, comment));
  };

  return (
    <div>
      <form onSubmit={handleComment}>
        <input name='comment' type='text' />
        <button type='submit'>add Comment</button>
      </form>
      {blog.comments.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))}
    </div>
  );
};

export default CommentForm;
