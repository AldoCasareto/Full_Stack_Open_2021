import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';


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
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
        <div style={showWhenVisible}>
          {props.children}
          <Button onClick={toggleVisibility}>cancel</Button>
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
