import React from 'react';

const Notification = ({ notifications }) => {
  if (!notifications) return null;

  const notificationColor = () => {
    return notifications.type === 'success' ? 'green' : 'red';
  };

  const notificationStyle = {
    color: notificationColor(),
    background: 'grey',
    fontSize: 20,
    border: `solid 5px ${notificationColor()}`,
    padding: 10,
  };

  return (
    <div>
      <h2 style={notificationStyle}>{notifications.message}</h2>
    </div>
  );
};

export default Notification;
