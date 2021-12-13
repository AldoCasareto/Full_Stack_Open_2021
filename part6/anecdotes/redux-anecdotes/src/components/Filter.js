import React from 'react';
// import { useDispatch } from 'react-redux';
import { filterAnecdotes } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = (props) => {
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    props.filterAnecdotes(event.target.value);
    // dispatch(filterAnecdotes(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToState = (state) => {
  return { filter: state.filter };
};

const mapDispatchToProps = { filterAnecdotes };

const connectedFilter = connect(mapDispatchToState, mapDispatchToProps)(Filter);

export default connectedFilter;
