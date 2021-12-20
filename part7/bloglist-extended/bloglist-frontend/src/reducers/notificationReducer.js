const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    console.log(action);
    return action.data;
  case 'CLEAR_NOTIFICATION':
    return null;
  default:
    return state;
  }
};

export const setNotificationSuccess = (notification) => {
  console.log(notification);
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message: notification, type: 'success' },
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, 5000);
  };
};

export const setNotificationError = (notification) => {
  console.log(notification);
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message: notification, type: 'error' },
    });
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, 5000);
  };
};

export default notificationReducer;
