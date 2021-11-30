import React from 'react';

const Messages = ({ notification }) => {
  if (!notification) return null;

  const colorMessage = () => {
    return notification.status === 'success' ? 'green' : 'red';
  };

  const notificationStyle = {
    color: colorMessage(),
    background: 'grey',
    fontSize: 20,
    border: `solid 5px ${colorMessage()}`,
    padding: 10
  };

  console.log(notificationStyle);

  return (
    <div style={notificationStyle}>{notification && notification.message}</div>
  );
};

export default Messages;
