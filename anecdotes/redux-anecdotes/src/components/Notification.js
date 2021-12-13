import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const Notification = (props) => {
  // const notification = useSelector((state) => state.notification);

  // console.log('state', notification);

  // console.log(notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return props.notification && <div style={style}>{props.notification}</div>;
};

const mapsStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotifications = connect(mapsStateToProps)(Notification);

export default ConnectedNotifications;
