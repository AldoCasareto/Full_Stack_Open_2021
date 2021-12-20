// import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks/index';

const CreateNew = (props) => {
  //   const [content, setContent] = useState('');
  //   const [author, setAuthor] = useState('');
  //   const [info, setInfo] = useState('')
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push('/');

    // setContent('');
    // setAuthor('');
    // setInfo('');
  };

  const handleReset = (e) => {
    e.preventDefault();
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
