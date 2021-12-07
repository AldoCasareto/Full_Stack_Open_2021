import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true);

  const hideWhenVisible = { display: visible ? '' : 'none' };
  const showWhenVisible = { display: visible ? 'none' : '' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={{ hideWhenVisible }}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    </>
  );
});

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggable.displayName = 'Togglable';


export default Toggable;
