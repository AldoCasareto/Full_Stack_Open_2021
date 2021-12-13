const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

export const showNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message,
    });
    setTimeout(() => {
      dispatch(hideNotification());
    }, time * 1000);
  };
};

export const hideNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' };
};

export default notificationReducer;
